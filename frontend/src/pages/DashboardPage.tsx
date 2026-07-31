import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import ProjectCard from "../components/project/ProjectCard";
import CreateProjectModal from "../components/project/CreateProjectModal";
import { listProjects } from "../services/project/projectService";
import type { Project } from "../types/project.types";
import "./DashboardPage.css";

function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Runs once when the Dashboard first mounts, to load the user's projects.
  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const data = await listProjects();
      setProjects(data);
    } catch {
      setErrorMessage("Could not load your projects. Please refresh the page.");
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Adds the newly created project to the top of the list immediately,
   * instead of calling the API again to refetch the whole list.
   */
  function handleProjectCreated(project: Project) {
    setProjects((current) => [project, ...current]);
  }

  return (
    <div>
      <Navbar />

      <div className="dashboard">
        <div className="dashboard__header">
          <div>
            <h1 className="dashboard__title">Your projects</h1>
            <p className="dashboard__subtitle">
              {projects.length} project{projects.length === 1 ? "" : "s"}
            </p>
          </div>

          <button
            type="button"
            className="auth-submit dashboard__new-button"
            onClick={() => setIsModalOpen(true)}
          >
            + New project
          </button>
        </div>

        {isLoading && <p>Loading projects...</p>}

        {errorMessage && <p className="auth-error">{errorMessage}</p>}

        {!isLoading && !errorMessage && projects.length === 0 && (
          <div className="dashboard__empty">
            <p>You don't have any projects yet.</p>
            <button
              type="button"
              className="auth-submit dashboard__new-button"
              onClick={() => setIsModalOpen(true)}
            >
              Create your first project
            </button>
          </div>
        )}

        {!isLoading && projects.length > 0 && (
          <div className="dashboard__grid">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <CreateProjectModal
          onClose={() => setIsModalOpen(false)}
          onCreated={handleProjectCreated}
        />
      )}
    </div>
  );
}

export default DashboardPage;
