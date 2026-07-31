import { useState, type FormEvent } from 'react';
import { createTask } from '../../services/task/taskService';
import type { Task } from '../../types/task.types';
import './AddTaskForm.css';

interface AddTaskFormProps {
  projectId: number;
  onCreated: (task: Task) => void;
}

/**
 * A compact always-visible form for quickly adding a task to the project,
 * similar to a Trello-style "quick add" row.
 */
function AddTaskForm({ projectId, onCreated }: AddTaskFormProps) {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);

    try {
      const task = await createTask(projectId, { title });
      onCreated(task);
      setTitle('');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : 'Add'}
      </button>
    </form>
  );
}

export default AddTaskForm;