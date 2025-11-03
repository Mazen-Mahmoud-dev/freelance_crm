import Modal from "react-modal";
import { useDeleteClient } from "../../hooks/useClients";

export default function DeleteClientModal({ client, isOpen, onClose }) {
  const deleteClientMutation = useDeleteClient();

  const handleDelete = () => {
    deleteClientMutation.mutate(client.id, {
      onSuccess: () => {
        onClose();
      },
      onError: (error) => {
        console.error(error);
        alert("Failed to delete client.");
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Delete Client Modal"
      className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md mx-auto mt-40 shadow-lg outline-none"
      overlayClassName="fixed inset-0 bg-black/40 flex items-start justify-center z-100"
    >
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Delete Client
      </h2>
      <p className="mb-6 text-gray-700 dark:text-gray-300">
        Are you sure you want to delete <strong>{client.name}</strong>? This action cannot be undone.
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
          disabled={deleteClientMutation.isLoading}
        >
          {deleteClientMutation.isLoading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </Modal>
  );
}
