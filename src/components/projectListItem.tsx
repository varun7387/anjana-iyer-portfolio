import { Link } from "gatsby";
import Img, { FluidObject } from "gatsby-image";
import * as React from "react";
import * as styles from "./projectList.module.scss";
export interface ProjectListItemData {
  id: string;
  slug: string;
  date: string;
  title: {
    title: string;
  };
  thumbnail: {
    fluid: FluidObject;
  };
}

interface ProjectListItemProps {
  data: ProjectListItemData;
}

export class ProjectListItem extends React.Component<ProjectListItemProps, {}> {
  public render() {
    const project = this.props.data;

    return (
      <div className={styles.ProjectListItemContent}>
        <Link to={`/project/${project.slug}`}>
          <Img
            fluid={project.thumbnail.fluid}
            className={styles.ProjectThumbnail}
          />
          <h3 className={styles.ProjectTitle}>{project.title.title}</h3>
        </Link>
      </div>
    );
  }
}
