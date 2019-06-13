import * as React from "react";
import Masonry from "react-masonry-css";
import * as styles from "./projectList.module.scss";
import { ProjectListItem, ProjectListItemData } from "./projectListItem";

interface ProjectListProps {
  projects: ProjectListItemData[];
}

export default class ProjectList extends React.Component<ProjectListProps, {}> {
  public render() {
    const breakpointColumnsObj = {
      default: 3,
      1100: 2,
      700: 2,
      500: 2
    };
    return (
      <Masonry
        className={styles.Projects}
        columnClassName={styles.ProjectListItem}
        breakpointCols={breakpointColumnsObj}
      >
        {this.props.projects.map((project, index) => (
          <ProjectListItem key={index} data={project} />
        ))}
      </Masonry>
    );
  }
}
