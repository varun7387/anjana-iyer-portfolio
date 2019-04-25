import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { graphql } from "gatsby";
import * as React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import * as styles from "./Project.module.scss";

export const projectPageQuery = graphql`
  query ProjectPageQuery($id: String!) {
    site {
      siteMetadata {
        lang
        author
      }
    }
    contentfulProject(id: { eq: $id }) {
      id
      slug
      date(formatString: "MMM YYYY")
      title {
        title
      }
      description {
        json
      }
      tags
      files {
        id
        title
        description
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
`;

interface ProjectPageProps {
  pageContext: {
    id: string;
    location: string;
  };
  data: {
    site: {
      siteMetadata: {
        lang: string;
        author: string;
      };
    };
    contentfulProject: {
      id: string;
      slug: string;
      date: string;
      tags: string[];
      title: {
        title: string;
      };
      description: {
        json: any;
      };
      files: Array<{
        id: string;
        title: string;
        description: string;
        file: {
          contentType: string;
        };
        fluid: {
          sizes: string;
          src: string;
        };
      }>;
    };
  };
}

export default class Project extends React.Component<ProjectPageProps, {}> {
  public renderRichTextComponent = (document: any) => {
    return documentToReactComponents(document);
  };

  public render() {
    const pageContext = this.props.pageContext;
    const data = this.props.data.contentfulProject;
    return (
      <Layout currentLocation={pageContext.location} title={data.title.title}>
        <SEO
          title={data.title.title}
          description={""}
          keywords={data.tags}
          author={this.props.data.site.siteMetadata.author}
          lang={this.props.data.site.siteMetadata.lang}
          meta={[]}
        />
        <div className={styles.Container}>
          <h1>{data.title.title}</h1>
        </div>
      </Layout>
    );
  }
}
