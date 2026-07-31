// Shape of a project, exactly as returned by ProjectResource on the backend.
// tasks_count is optional because it only appears when the backend eager-loads
// it via withCount('tasks') - which happens on the list endpoint, but might not
// happen everywhere.
export interface Project {
  id: number;
  name: string;
  description: string | null;
  tasks_count?: number;
  created_at: string;
  updated_at: string;
}

export interface CreateProjectPayload {
  name: string;
  description?: string;
}

export interface UpdateProjectPayload {
  name?: string;
  description?: string;
}
