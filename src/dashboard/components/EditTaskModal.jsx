import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { useUpdateTask } from "../../hooks/useTasks";
import { FiX } from "react-icons/fi";

const EditTaskModal = ({ task, projectId, isOpen, onClose }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [completed, setCompleted] = useState(task?.completed || false);

  const updateTask = useUpdateTask();

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setCompleted(task.completed || false);
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    updateTask.mutate(
      { id: task.id, data: { title, description, completed, project_id: projectId } },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  if (!task) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />

        <div className="bg-card rounded-2xl w-full max-w-md mx-auto p-6 relative shadow-lg">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          >
            <FiX className="w-6 h-6" />
          </button>

          <Dialog.Title className="text-xl font-bold text-foreground mb-4">
            Edit Task
          </Dialog.Title>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-border px-3 py-2 bg-bg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-lg border border-border px-3 py-2 bg-bg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
                className="w-4 h-4 rounded border border-border text-blue-500 focus:ring-0"
              />
              <label className="text-sm text-foreground">Completed</label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default EditTaskModal;
