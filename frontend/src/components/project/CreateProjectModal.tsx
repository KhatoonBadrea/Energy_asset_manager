import { useState, type FormEvent } from "react";
import { isAxiosError } from "axios";
import { createProject } from "../../services/project/projectService";
import type { Project } from "../../types/project.types";
import "./CreateProjectModal.css";

interface CreateProjectModalProps {
  onClose: () => void;
  onCreated: (project: Project) => void;
}

/**
 * A modal form for creating a new project. On success, the new project is
 * passed back to the Dashboard via onCreated, so the list updates instantly
 * without a full refetch from the server.
 */
function CreateProjectModal({ onClose, onCreated }: CreateProjectModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const project = await createProject({
        name,
        description: description || undefined,
      });
      onCreated(project);
      onClose();
    } catch (error) {
      if (isAxiosError(error) && error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Could not create the project. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* stopPropagation prevents a click inside the modal from bubbling up
          to the overlay's onClick, which would otherwise close the modal
          every time the user clicks inside the form. */}
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <h2 className="modal__title">New project</h2>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="project-name">Name</label>
            <input
              id="project-name"
              type="text"
              placeholder="Solar Farm Monitoring"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="project-description">Description (optional)</label>
            <textarea
              id="project-description"
              placeholder="What is this project about?"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={3}
            />
          </div>

          {errorMessage && <p className="auth-error">{errorMessage}</p>}

          <div className="modal__actions">
            <button type="button" className="modal__cancel" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="auth-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProjectModal;
