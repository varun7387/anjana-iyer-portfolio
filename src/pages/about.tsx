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
    contentfulAboutPage: {
      contentful_id: string;
      title: string;
      tags: string[];
      clients: string[];
      portrait: {
        fluid: {
          src: string;
        };
      };
      bio: {
        bio: string;
        childMarkdownRemark: {
          html: string;
        };
      };
      additionalInformation: {
        childMarkdownRemark: {
          html: string;
        };
      };
      contactInformation: {
        childMarkdownRemark: {
          html: string;
        };
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
    contentfulAboutPage(contentful_id: { eq: "2slqRgqcNEram2ugwO9Ixs" }) {
      contentful_id
      title
      instagramId
      tags
      clients
      portrait {
        fluid {
          src
          srcSet
        }
      }
      bio {
        bio
        childMarkdownRemark {
          html
        }
      }
      contactInformation {
        contactInformation
        childMarkdownRemark {
          html
        }
      }
      additionalInformation {
        additionalInformation
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;

export default class AboutPage extends React.Component<AboutPageProps, {}> {
  public render() {
    const siteData = this.props.data.site.siteMetadata;
    const pageData = this.props.data.contentfulAboutPage;
    const pageKeywords = pageData.tags || [];
    return (
      <Layout currentLocation="/about" title={siteData.title}>
        <SEO
          title={siteData.title}
          description={pageData.bio.bio}
          keywords={siteData.keywords.concat(pageKeywords)}
          author={siteData.author}
          lang={siteData.lang}
          meta={[]}
        />

        <div className={styles.Container}>
          <img
            src={pageData.portrait.fluid.src}
            className="project-thumbnail"
          />
          <div
            dangerouslySetInnerHTML={{
              __html: pageData.bio.childMarkdownRemark.html
            }}
          />
          <div
            dangerouslySetInnerHTML={{
              __html: pageData.additionalInformation.childMarkdownRemark.html
            }}
          />
          <h3>Contact Information</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: pageData.contactInformation.childMarkdownRemark.html
            }}
          />
          <div>
            <h3>Clients</h3>
            <ul>
              {pageData.clients.map((client, index) => (
                <li key={index}>{client}</li>
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    );
  }
}
