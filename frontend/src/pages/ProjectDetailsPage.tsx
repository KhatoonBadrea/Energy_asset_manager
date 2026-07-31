import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import TaskItem from "../components/task/TaskItem";
import AddTaskForm from "../components/task/AddTaskForm";
import { getProject } from "../services/project/projectService";
import type { Project } from "../types/project.types";
import type { Task } from "../types/task.types";
import "./ProjectDetailsPage.css";

function ProjectDetailsPage() {
  // useParams reads the dynamic part of the URL defined in AppRoutes ("/projects/:id").
  // It always returns strings, so we convert it to a number before using it in API calls.
  const { id } = useParams<{ id: string }>();
  const projectId = Number(id);

  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    loadProject();
  }, [projectId]);

  async function loadProject() {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // getProject already returns the project with its tasks eager-loaded
      // (see ProjectService::show on the backend), so one request is enough.
      const data = await getProject(projectId);
      setProject(data);
      setTasks((data as Project & { tasks?: Task[] }).tasks ?? []);
    } catch {
      setErrorMessage("Could not load this project.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleTaskCreated(task: Task) {
    setTasks((current) => [task, ...current]);
  }

  function handleTaskUpdated(updatedTask: Task) {
    setTasks((current) =>
      current.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  }

  function handleTaskDeleted(taskId: number) {
    setTasks((current) => current.filter((task) => task.id !== taskId));
  }

  return (
    <div>
      <Navbar />

      <div className="project-details">
        <Link to="/dashboard" className="project-details__back">
          ← Back to projects
        </Link>

        {isLoading && <p>Loading project...</p>}
        {errorMessage && <p className="auth-error">{errorMessage}</p>}

        {!isLoading && project && (
          <>
            <div className="project-details__header">
              <h1 className="project-details__title">{project.name}</h1>
              {project.description && (
                <p className="project-details__description">
                  {project.description}
                </p>
              )}
            </div>

            <AddTaskForm projectId={projectId} onCreated={handleTaskCreated} />

            {tasks.length === 0 ? (
              <p className="project-details__empty">
                No tasks yet. Add your first one above.
              </p>
            ) : (
              <div className="project-details__tasks">
                {tasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    projectId={projectId}
                    onUpdated={handleTaskUpdated}
                    onDeleted={handleTaskDeleted}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ProjectDetailsPage;
