import { graphql } from "gatsby";
import * as React from "react";
import * as styles from "./Index.module.scss";
import {
  Document as ContentfulRichText,
  BLOCKS,
  MARKS
} from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        name: string;
        tagline: string;
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
            description: ContentfulRichText;
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
        name
        tagline
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
          description {
            json
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
  public renderProjectTile = (project: any, index: number) => {
    return (
      <div key={index}>
        <img src={project.thumbnail.fluid.src} />
        <h2>{project.title.title}</h2>
        <strong>{project.date}</strong>
        <br />
        <strong>{project.slug}</strong>
        <br />
        <p>{project.description.json.value}</p>
      </div>
    );
  };

  public render() {
    const { name, tagline } = this.props.data.site.siteMetadata;
    const projects = this.props.data.allContentfulProject.edges.map(
      edge => edge.node
    );

    return (
      <div className={styles.Container}>
        <h1>{name}</h1>
        <p>{tagline}</p>

        <div className={styles.Projects}>
          {projects.map((project, index) =>
            this.renderProjectTile(project, index)
          )}
        </div>
      </div>
    );
  }
}
