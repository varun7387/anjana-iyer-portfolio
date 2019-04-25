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
                  slug
                  date(formatString: "MMM YYYY")
                  title {
                    title
                  }
                  description {
                    json
                  }
                  files {
                    fluid {
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
              id: node.id,
              location: path
            }
          });
        });
      })
    );
  });
};
