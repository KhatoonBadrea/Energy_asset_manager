import { Link } from "react-router-dom";
import type { Project } from "../../types/project.types";
import "./ProjectCard.css";

interface ProjectCardProps {
  project: Project;
}

/**
 * A clickable card summarizing one project. Clicking it navigates to
 * that project's details page (/projects/:id), built in the next phase.
 */
function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link to={`/projects/${project.id}`} className="project-card">
      <h3 className="project-card__name">{project.name}</h3>
      <p className="project-card__description">
        {project.description || "No description provided."}
      </p>
      <span className="project-card__count">
        {project.tasks_count ?? 0} task{project.tasks_count === 1 ? "" : "s"}
      </span>
    </Link>
  );
}

export default ProjectCard;
