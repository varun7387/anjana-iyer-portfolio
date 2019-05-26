import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { graphql } from "gatsby";
import * as React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import * as styles from "./About.module.scss";

interface AboutPageProps {
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
  };
}

export const aboutPageQuery = graphql`
  query AboutPageQuery {
    site {
      siteMetadata {
        title
        lang
        author
        description
        keywords
      }
    }
  }
`;

export default class AboutPage extends React.Component<AboutPageProps, {}> {
  public renderRichText = (document: any) => {
    return documentToReactComponents(document);
  };

  public render() {
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

        <div className={styles.Container} />
      </Layout>
    );
  }
}
