import { Link } from "gatsby";
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
    fluid: {
      sizes: string;
      src: string;
    };
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
          <img
            src={project.thumbnail.fluid.src}
            className={styles.ProjectThumbnail}
          />
          <h3 className={styles.ProjectTitle}>{project.title.title}</h3>
        </Link>
      </div>
    );
  }
}
