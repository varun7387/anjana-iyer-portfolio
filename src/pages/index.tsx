import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { graphql } from "gatsby";
import * as React from "react";
import Layout from "./../components/layout";
import * as styles from "./Index.module.scss";
import SEO from "../components/seo";
import { Link } from "@reach/router";

interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        description: string;
        keywords: string[];
        lang: string;
        title: string;
        author: string;
      };
    };
    contentfulHomePage: {
      title: {
        title: string;
      };
      herocontent: {
        json: any;
      };
    };
    allContentfulProject: {
      edges: [
        {
          node: {
            id: string;
            slug: string;
            date: string;
            title: {
              title: string;
            };
            description: {
              json: any;
            };
            thumbnail: {
              fluid: {
                sizes: string;
                src: string;
              };
            };
          };
        }
      ];
    };
  };
}

export const indexPageQuery = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        title
        lang
        author
        description
        keywords
      }
    }
    contentfulHomePage(contentful_id: { eq: "6Ty1K85TEN93ZE7XXxI8vE" }) {
      title {
        title
      }
      herocontent {
        json
      }
    }
    allContentfulProject(sort: { fields: [date] }) {
      edges {
        node {
          id
          slug
          date(formatString: "MMM YYYY")
          title {
            title
          }
          thumbnail {
            fluid(maxWidth: 512) {
              sizes
              src
            }
          }
        }
      }
    }
  }
`;

export default class IndexPage extends React.Component<IndexPageProps, {}> {
  public renderRichText = (document: any) => {
    return documentToReactComponents(document);
  };

  public renderProjectTile = (project: any, index: number) => {
    return (
      <div key={index}>
        <img src={project.thumbnail.fluid.src} />
        <h4>{project.title.title}</h4>
        <strong>{project.date}</strong>
        <br />
        <Link to={`/project/${project.slug}`}>{project.slug}</Link>
      </div>
    );
  };

  public render() {
    const homepageData = this.props.data.contentfulHomePage;

    const projects = this.props.data.allContentfulProject.edges.map(
      edge => edge.node
    );

    return (
      <Layout
        currentLocation="/"
        title={this.props.data.site.siteMetadata.title}
      >
        <SEO
          title={this.props.data.site.siteMetadata.title}
          description={this.props.data.site.siteMetadata.description}
          keywords={this.props.data.site.siteMetadata.keywords}
          author={this.props.data.site.siteMetadata.author}
          lang={this.props.data.site.siteMetadata.lang}
          meta={[]}
        />
        <div className={styles.Container}>
          <h1>{homepageData.title.title}</h1>
          {this.renderRichText(homepageData.herocontent)}
          <div className={styles.Projects}>
            {projects.map((project, index) =>
              this.renderProjectTile(project, index)
            )}
          </div>
        </div>
      </Layout>
    );
  }
}
