import Modal from "react-modal";
import { useDeleteProject } from "../../hooks/useProjects";
import { useNavigate } from "react-router-dom";

export default function DeleteProjectModal({ project, isOpen, onClose }) {
  const deleteProjectMutation = useDeleteProject();
  const navigate = useNavigate()
  const handleDelete = () => {
    deleteProjectMutation.mutate(project.id, {
      onSuccess: () => {
        onClose();
        navigate("/dashboard/projects")
      },
      onError: (error) => {
        console.error(error);
        alert("Failed to delete project.");
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Delete Project Modal"
      className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md mx-auto mt-40 shadow-lg outline-none"
      overlayClassName="fixed inset-0 bg-black/40 flex items-start justify-center z-100"
    >
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Delete Project
      </h2>
      <p className="mb-6 text-gray-700 dark:text-gray-300">
        Are you sure you want to delete <strong>{project.name}</strong>? This action cannot be undone.
      </p>
      <div className="flex justify-end gap-4">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
          disabled={deleteProjectMutation.isLoading}
        >
          {deleteProjectMutation.isLoading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </Modal>
  );
}
