import React from "react";
import Helmet from "react-helmet";

interface SeoProps {
  description: string;
  keywords: string[];
  lang: string;
  meta: any[];
  title: string;
  author: string;
}

export default class SEO extends React.Component<SeoProps, {}> {
  public render() {
    return (
      <Helmet
        htmlAttributes={{ lang: this.props.lang }}
        title={this.props.title}
        titleTemplate={`%s | ${this.props.title}`}
        meta={[
          {
            content: this.props.description,
            name: `description`
          },
          {
            content: this.props.title,
            property: `og:title`
          },
          {
            content: this.props.description,
            property: `og:description`
          },
          {
            content: `website`,
            property: `og:type`
          },
          {
            content: `summary`,
            name: `twitter:card`
          },
          {
            content: this.props.author,
            name: `twitter:creator`
          },
          {
            content: this.props.title,
            name: `twitter:title`
          },
          {
            content: this.props.description,
            name: `twitter:description`
          }
        ]
          .concat(
            this.props.keywords.length > 0
              ? {
                  content: this.props.keywords.join(`, `),
                  name: `keywords`
                }
              : []
          )
          .concat(this.props.meta)}
      />
    );
  }
}
