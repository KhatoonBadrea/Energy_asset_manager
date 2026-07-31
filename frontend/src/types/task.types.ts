// Mirrors the TaskStatus enum defined on the backend (app/Enums/TaskStatus.php).
// Using a union type here means TypeScript rejects any status string
// that isn't one of these three exact values.
export type TaskStatus = "todo" | "in_progress" | "done";

// Shape of a task, exactly as returned by TaskResource on the backend.
export interface Task {
  id: number;
  project_id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  status_label: string;
  created_at: string;
  updated_at: string;
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
}

export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  status?: TaskStatus;
}
