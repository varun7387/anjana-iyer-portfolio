const path = require(`path`);
require(`dotenv`).config({ path: `.env` });

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const projectTemplate = path.resolve(`src/templates/project.tsx`);
    resolve(
      graphql(
        `
          {
            allContentfulProject(sort: { fields: [date] }) {
              edges {
                node {
                  id
                  contentful_id
                  slug
                  date(formatString: "MMM YYYY")
                  title {
                    title
                  }
                  description {
                    description
                  }
                  tags
                  files {
                    id
                    title
                    file {
                      contentType
                    }
                    fluid(maxWidth: 1920) {
                      sizes
                      src
                    }
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors);
        }

        // Create pages for each project.
        result.data.allContentfulProject.edges.forEach(({ node }) => {
          const path = `/project/${node.slug}`;
          createPage({
            path,
            component: projectTemplate,
            context: {
              contentful_id: node.contentful_id,
              location: path
            }
          });
        });
      })
    );
  });
};
