import { useEffect } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { useUpdateProject } from "../../hooks/useProjects";
import toast from "react-hot-toast";

export default function EditProjectModal({ project, isOpen, onClose }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: project.title,
      description: project.description || "",
    },
  });

  const updateProjectMutation = useUpdateProject();

  const onSubmit = (data) => {
    updateProjectMutation.mutate(
      { id: project.id, data },
      {
        onSuccess: () => {
          toast.success("Project updated successfully!");
          onClose();
        },
        onError: (error) => {
          console.error(error);
          toast.error("Failed to update project.");
        },
      }
    );
  };

  useEffect(() => {
    reset({
      title: project.title,
      description: project.description || "",
    });
  }, [project, reset]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit Project Modal"
      className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md mx-auto mt-40 shadow-lg outline-none"
      overlayClassName="fixed inset-0 bg-black/40 flex items-start justify-center z-100"
    >
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Edit Project
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">
            Project title
          </label>
          <input
            {...register("title", { required: true })}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            {...register("description")}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
            disabled={updateProjectMutation.isLoading}
          >
            {updateProjectMutation.isLoading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
