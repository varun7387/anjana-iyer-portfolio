import { Link } from "gatsby";
import * as React from "react";
import { Col } from "react-bootstrap";

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
  key: number;
  data: ProjectListItemData;
}

export class ProjectListItem extends React.Component<ProjectListItemProps, {}> {
  public render() {
    const project = this.props.data;

    return (
      <Col key={this.props.key} className="project-tile">
        <Link to={`/project/${project.slug}`}>
          <img
            src={project.thumbnail.fluid.src}
            className="project-thumbnail"
          />
          <h3 className="project-title">{project.title.title}</h3>
        </Link>
      </Col>
    );
  }
}
