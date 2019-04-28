import * as React from "react";
import { ProjectListItem, ProjectListItemData } from "./projectListItem";

interface ProjectListProps {
  projects: ProjectListItemData[];
}

export default class ProjectList extends React.Component<ProjectListProps, {}> {
  public render() {
    return this.props.projects.map((project, index) => (
      <ProjectListItem key={index} data={project} />
    ));
  }
}
