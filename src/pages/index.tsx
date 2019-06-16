import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { graphql } from "gatsby";
import * as React from "react";
import ProjectList from "../components/projectList";
import { ProjectListItemData } from "../components/projectlistItem";
import SEO from "../components/seo";
import Layout from "./../components/layout";

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
    allContentfulProject: {
      edges: [
        {
          node: ProjectListItemData;
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
    allContentfulProject(sort: { fields: [date] }) {
      edges {
        node {
          id
          slug
          date(formatString: "YYYY-MM-DD")
          title {
            title
          }
          thumbnail {
            fluid(maxWidth: 640) {
              ...GatsbyContentfulFluid_withWebp_noBase64
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

  public render() {
    const projects = this.props.data.allContentfulProject.edges
      .map(edge => edge.node)
      .sort((prev, curr) => (prev.date < curr.date ? 1 : 0));

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

        <ProjectList projects={projects} />
      </Layout>
    );
  }
}
