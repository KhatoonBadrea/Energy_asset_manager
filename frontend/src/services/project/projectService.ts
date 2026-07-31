import api from "../api";
import type {
  Project,
  CreateProjectPayload,
  UpdateProjectPayload,
} from "../../types/project.types";

// Laravel API Resources always wrap their payload in a top-level "data" key,
// so every response type here mirrors that shape.
interface ProjectListResponse {
  data: Project[];
}

interface ProjectResponse {
  data: Project;
}

/**
 * Fetch every project belonging to the authenticated user.
 */
export async function listProjects(): Promise<Project[]> {
  const response = await api.get<ProjectListResponse>("/projects");
  return response.data.data;
}

/**
 * Create a new project for the authenticated user.
 */
export async function createProject(
  payload: CreateProjectPayload,
): Promise<Project> {
  const response = await api.post<ProjectResponse>("/projects", payload);
  return response.data.data;
}

/**
 * Fetch a single project, including its tasks.
 */
export async function getProject(id: number): Promise<Project> {
  const response = await api.get<ProjectResponse>(`/projects/${id}`);
  return response.data.data;
}

/**
 * Update an existing project.
 */
export async function updateProject(
  id: number,
  payload: UpdateProjectPayload,
): Promise<Project> {
  const response = await api.put<ProjectResponse>(`/projects/${id}`, payload);
  return response.data.data;
}

/**
 * Permanently delete a project.
 */
export async function deleteProject(id: number): Promise<void> {
  await api.delete(`/projects/${id}`);
}
