import { graphql } from "gatsby";
import * as React from "react";
import SEO from "../components/seo";
import Layout from "./../components/layout";

interface NotFoundPageProps {
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

export const notFoundPageQuery = graphql`
  query NotFoundPageQuery {
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

export default class NotFoundPage extends React.Component<
  NotFoundPageProps,
  {}
> {
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

        <h1 className="text-center">404! Page not found!</h1>
      </Layout>
    );
  }
}
