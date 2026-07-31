import { useState } from "react";
import type { Task, TaskStatus } from "../../types/task.types";
import { updateTask, deleteTask } from "../../services/task/taskService";
import "./TaskItem.css";

interface TaskItemProps {
  task: Task;
  projectId: number;
  onUpdated: (task: Task) => void;
  onDeleted: (taskId: number) => void;
}

/**
 * A single task row with an inline status dropdown and a delete button.
 * Both actions call the API immediately, then report the result back to
 * ProjectDetailsPage so the list stays in sync with the database.
 */
function TaskItem({ task, projectId, onUpdated, onDeleted }: TaskItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleStatusChange(newStatus: TaskStatus) {
    setIsUpdating(true);

    try {
      const updated = await updateTask(projectId, task.id, {
        status: newStatus,
      });
      onUpdated(updated);
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete "${task.title}"? This cannot be undone.`,
    );
    if (!confirmed) return;

    setIsDeleting(true);

    try {
      await deleteTask(projectId, task.id);
      onDeleted(task.id);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className={`task-item task-item--${task.status}`}>
      <div className="task-item__content">
        <p className="task-item__title">{task.title}</p>
        {task.description && (
          <p className="task-item__description">{task.description}</p>
        )}
      </div>

      <div className="task-item__actions">
        <select
          className="task-item__status"
          value={task.status}
          disabled={isUpdating}
          onChange={(event) =>
            handleStatusChange(event.target.value as TaskStatus)
          }
        >
          <option value="todo">To do</option>
          <option value="in_progress">In progress</option>
          <option value="done">Done</option>
        </select>

        <button
          type="button"
          className="task-item__delete"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "..." : "Delete"}
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
