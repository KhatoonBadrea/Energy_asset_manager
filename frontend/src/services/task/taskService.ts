import api from "../api";
import type {
  Task,
  CreateTaskPayload,
  UpdateTaskPayload,
} from "../../types/task.types";

interface TaskListResponse {
  data: Task[];
}

interface TaskResponse {
  data: Task;
}

/**
 * Fetch every task that belongs to the given project.
 */
export async function listTasks(projectId: number): Promise<Task[]> {
  const response = await api.get<TaskListResponse>(
    `/projects/${projectId}/tasks`,
  );
  return response.data.data;
}

/**
 * Create a new task under the given project.
 */
export async function createTask(
  projectId: number,
  payload: CreateTaskPayload,
): Promise<Task> {
  const response = await api.post<TaskResponse>(
    `/projects/${projectId}/tasks`,
    payload,
  );
  return response.data.data;
}

/**
 * Update an existing task - most commonly used to change its status.
 */
export async function updateTask(
  projectId: number,
  taskId: number,
  payload: UpdateTaskPayload,
): Promise<Task> {
  const response = await api.put<TaskResponse>(
    `/projects/${projectId}/tasks/${taskId}`,
    payload,
  );
  return response.data.data;
}

/**
 * Permanently delete a task.
 */
export async function deleteTask(
  projectId: number,
  taskId: number,
): Promise<void> {
  await api.delete(`/projects/${projectId}/tasks/${taskId}`);
}
