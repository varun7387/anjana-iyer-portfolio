import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { graphql } from "gatsby";
import * as React from "react";
import { Col, Row, Container } from "react-bootstrap";
import { Player } from "video-react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import * as styles from "./Project.module.scss";

export const projectPageQuery = graphql`
  query ProjectPageQuery($contentful_id: String!) {
    site {
      siteMetadata {
        lang
        author
        keywords
      }
    }
    contentfulProject(contentful_id: { eq: $contentful_id }) {
      contentful_id
      slug
      date(formatString: "MMM YYYY")
      title {
        title
      }
      description {
        description
        childMarkdownRemark {
          html
        }
      }
      tags
      files {
        id
        title
        file {
          contentType
          url
        }
        fluid(maxWidth: 1920) {
          sizes
          src
        }
      }
    }
  }
`;

interface ContentfulFile {
  id: string;
  title: string;
  file: {
    contentType: string;
    url: string;
  };
  fluid: {
    sizes: string;
    src: string;
  };
}

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
        keywords: string[];
      };
    };
    contentfulProject: {
      id: string;
      contentful_id: string;
      slug: string;
      date: string;
      tags: string[];
      title: {
        title: string;
      };
      description: {
        description: string;
        childMarkdownRemark: {
          html: string;
        };
      };
      files: ContentfulFile[];
    };
  };
}

export default class Project extends React.Component<ProjectPageProps, {}> {
  public renderRichTextComponent = (document: any) => {
    return documentToReactComponents(document);
  };
  public renderVideo(file: ContentfulFile, key: number) {
    return (
      <li key={key} className={styles.ProjectVideo}>
        <Player playsInline={true} src={file.file.url} />
      </li>
    );
  }

  public renderImage(file: ContentfulFile, key: number) {
    return (
      <li key={key} className={styles.ProjectImage}>
        <img src={file.fluid.src} title={file.title} />
      </li>
    );
  }

  public render() {
    const pageContext = this.props.pageContext;
    const data = this.props.data.contentfulProject;
    const siteTags = this.props.data.site.siteMetadata.keywords;
    const projectTags = data.tags || [];

    const images = data.files.filter(f => f.file.contentType !== "video/mp4");
    const videos = data.files.filter(f => f.file.contentType === "video/mp4");

    return (
      <Layout currentLocation={pageContext.location} title={data.title.title}>
        <SEO
          title={data.title.title}
          description={data.description.description}
          keywords={siteTags.concat(projectTags)}
          author={this.props.data.site.siteMetadata.author}
          lang={this.props.data.site.siteMetadata.lang}
          meta={[]}
        />
        <Row>
          <Col>
            <h1>{data.title.title}</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={4}>
            <div
              dangerouslySetInnerHTML={{
                __html: data.description.childMarkdownRemark.html
              }}
            />
          </Col>
          <Col xs={12} md={8}>
            <ul className={styles.ProjectAssets}>
              {videos.map((file, index) => this.renderVideo(file, index))}
              {images.map((file, index) => this.renderImage(file, index))}
            </ul>
          </Col>
        </Row>
      </Layout>
    );
  }
}
