import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, ChevronLeft } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { taskService } from "../../services/taskService";

export default function AddTask() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  console.log(projectId);
  
  const [form, setForm] = useState({
    title: "",
    description: "",
    due_date: "",
    priority: "Medium",
    status: "Pending",
  });

  const { mutate: createTask, isPending, isError, error } = useMutation({
    mutationFn: (payload) => taskService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks", projectId]);
      navigate(-1);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user?.id) return alert("User not authenticated");
    if (!form.title.trim()) return alert("Title is required");

    createTask({
      title: form.title.trim(),
      description: form.description.trim() || null,
      due_date: form.due_date || null,
      priority: form.priority,
      status: form.status,
      project_id: projectId,
      user_id: user.id,
    });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-muted hover:text-primary transition"
        >
          <ChevronLeft size={18} /> Back
        </button>
        <h2 className="text-3xl font-bold mx-auto">Add Task</h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-card rounded-xl shadow-sm p-6 space-y-5"
      >
        {/* Title */}
        <div>
          <label className="text-sm text-muted">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full bg-background border border-primary rounded-lg px-4 py-2"
          />
        </div>

        {/* Due Date */}
        <div>
          <label className="text-sm text-muted">Due Date</label>
          <input
            type="date"
            name="due_date"
            value={form.due_date}
            onChange={handleChange}
            className="w-full bg-background border border-primary rounded-lg px-4 py-2"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm text-muted">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full bg-background border border-primary rounded-lg px-4 py-2"
          />
        </div>
        <div>
          <label className="text-sm text-muted">Priority</label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full bg-background border border-primary rounded-lg px-4 py-2"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-muted">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full bg-background border border-primary rounded-lg px-4 py-2"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {isError && (
          <p className="text-red-500 text-sm">
            {error?.message || "Failed to add task"}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="bg-primary text-white px-6 py-3 rounded-lg flex items-center gap-2 disabled:opacity-50"
        >
          {isPending ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Adding...
            </>
          ) : (
            "Add Task"
          )}
        </button>
      </form>
    </div>
  );
}
