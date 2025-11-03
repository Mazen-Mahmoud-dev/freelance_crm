import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useCreateClient } from "../../hooks/useClients";
import { useAuth } from "../../context/AuthContext";

export default function AddClient() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { mutate: createClient, isPending, isError, error } = useCreateClient();

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    status: "Active",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user?.id) return alert("User not authenticated.");

    createClient(
      { ...form, user_id: user.id },
      {
        onSuccess: () => navigate("/dashboard/clients"),
      }
    );
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center flex-wrap">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-muted hover:text-primary transition"
        >
          <ChevronLeft size={18} /> Back
        </button>
        <h2 className="text-3xl font-bold text-text mx-auto">Add New Client</h2>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-card rounded-xl shadow-sm p-6 space-y-5"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-muted">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="bg-background border border-primary rounded-lg px-4 py-2 text-text focus:ring-2 focus:ring-primary outline-none transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-muted">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="bg-background border border-primary rounded-lg px-4 py-2 text-text focus:ring-2 focus:ring-primary outline-none transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-muted">Company</label>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              className="bg-background border border-primary rounded-lg px-4 py-2 text-text focus:ring-2 focus:ring-primary outline-none transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-muted">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="bg-background border border-primary rounded-lg px-4 py-2 text-text focus:ring-2 focus:ring-primary outline-none transition"
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-muted">Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={4}
            className="bg-background border border-primary rounded-lg px-4 py-2 text-text focus:ring-2 focus:ring-primary outline-none transition"
          />
        </div>

        {isError && (
          <p className="text-red-500 text-sm">
            {error?.message || "Failed to add client. Please try again."}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full md:w-auto bg-primary text-white px-6 py-3 rounded-lg shadow hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isPending ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Adding...
            </>
          ) : (
            "Add Client"
          )}
        </button>
      </form>
    </div>
  );
}
