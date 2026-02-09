import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, ChevronLeft } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { projectService } from "../../services/projectService";
import { clientService } from "../../services/clientService";
import { uploadFile, uploadMultiple } from "../../lib/storageService";

export default function AddProject() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    title: "",
    description: "",
    client: null,
    searchClient: "",
    due_date: "",
    thumbnail: null,
    thumbnailPreview: null,
    attachments: [],
  });

  // Fetch clients
  const { data: clients = [], isLoading: loadingClients } = useQuery({
    queryKey: ["clients", user?.id],
    queryFn: () => clientService.getAll(user.id),
    enabled: !!user?.id,
  });

  const { mutate: createProject, isPending, isError, error } = useMutation({
    mutationFn: (payload) => projectService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["projects", user.id]);
      navigate("/dashboard/projects");
    },
  });

  // --- Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];
    if (!file)
      return setForm((prev) => ({ ...prev, thumbnail: null, thumbnailPreview: null }));
    setForm((prev) => ({
      ...prev,
      thumbnail: file,
      thumbnailPreview: URL.createObjectURL(file),
    }));
  };

  const handleAttachmentsChange = (e) => {
    setForm((prev) => ({
      ...prev,
      attachments: Array.from(e.target.files),
    }));
  };

  const handleSelectClient = (client) => {
    setForm((prev) => ({
      ...prev,
      client,
      searchClient: "",
    }));
  };

  const filteredClients = useMemo(() => {
    if (!form.searchClient) return clients;
    return clients.filter((c) =>
      c.name?.toLowerCase().includes(form.searchClient.toLowerCase())
    );
  }, [form.searchClient, clients]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.id) return alert("User not authenticated.");
    if (!form.title.trim()) return alert("Title is required.");
    if(!form.due_date) return alert("Due Date is required.")
    if(!form.client) return alert("Client is required.")
    try {
      let thumbnailUrl = null;
      let attachmentUrls = [];

      if (form.thumbnail) {
        thumbnailUrl = await uploadFile("project-files", form.thumbnail);
      }

      if (form.attachments.length) {
        attachmentUrls = await uploadMultiple("project-files", form.attachments);
      }

      const payload = {
        title: form.title.trim(),
        description: form.description.trim() || null,
        client_id: form.client?.id || null,
        client_name: form.client?.name || null,
        thumbnail_url: thumbnailUrl,
        attachments: attachmentUrls,
        due_date: form.due_date || null,
        start_date: (new Date()).toLocaleDateString(),
        user_id: user.id,
        status: "Active",
      };

      createProject(payload);
    } catch (err) {
      console.error("Upload or creation failed:", err);
      alert("Failed to upload files or create project. Check console.");
    }
  };

  // --- UI ---
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
        <h2 className="text-3xl font-bold text-text mx-auto">Add New Project</h2>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-card rounded-xl shadow-sm p-6 space-y-5"
      >
        <div className="grid md:grid-cols-2 gap-4">
          {/* Title */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-muted">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="bg-background border border-primary rounded-lg px-4 py-2 text-text focus:ring-2 focus:ring-primary outline-none transition"
            />
          </div>

          {/* Due date */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-muted">Due Date</label>
            <input
              type="date"
              name="due_date"
              value={form.due_date}
              onChange={handleChange}
              required
              className="bg-background border border-primary rounded-lg px-4 py-2 text-text focus:ring-2 focus:ring-primary outline-none transition"
            />
          </div>
        </div>

        {/* Client dropdown */}
        <div className="flex flex-col gap-1 relative">
          <label className="text-sm text-muted">Client</label>
          <input
            type="text"
            placeholder={
              form.client ? form.client.name : "Search or choose client..."
            }
            value={form.searchClient}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, searchClient: e.target.value }))
            }
            className="bg-background border border-primary rounded-lg px-4 py-2 text-text focus:ring-2 focus:ring-primary outline-none transition"
          />

          {form.searchClient && (
            <div className="absolute z-50 mt-12 w-full bg-card border border-primary rounded-lg shadow max-h-48 overflow-auto">
              {loadingClients ? (
                <div className="p-3 text-center text-muted">Loading...</div>
              ) : filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <button
                    key={client.id}
                    type="button"
                    onClick={() => handleSelectClient(client)}
                    className="block w-full text-left px-4 py-2 hover:bg-background transition"
                  >
                    {client.name}
                  </button>
                ))
              ) : (
                <div className="p-3 text-sm text-muted">No clients found</div>
              )}
            </div>
          )}

          {form.client && (
            <p className="text-sm text-muted mt-1">
              Selected:{" "}
              <span className="font-medium text-text">{form.client.name}</span>{" "}
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, client: null }))}
                className="text-xs underline ml-2"
              >
                Remove
              </button>
            </p>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-muted">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="bg-background border border-primary rounded-lg px-4 py-2 text-text focus:ring-2 focus:ring-primary outline-none transition"
          />
        </div>

        {/* Thumbnail */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-muted">Thumbnail (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="bg-background border border-primary rounded-lg px-4 py-2 text-text focus:ring-2 focus:ring-primary outline-none transition"
          />
          {form.thumbnailPreview && (
            <img
              src={form.thumbnailPreview}
              alt="Preview"
              className="mt-2 w-24 h-24 object-cover rounded-lg border border-primary"
            />
          )}
        </div>

        {/* Attachments */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-muted">Attachments (optional)</label>
          <input
            type="file"
            multiple
            onChange={handleAttachmentsChange}
            className="bg-background border border-primary rounded-lg px-4 py-2 text-text focus:ring-2 focus:ring-primary outline-none transition"
          />
          {form.attachments.length > 0 && (
            <p className="text-sm text-muted mt-1">
              {form.attachments.length} file(s) selected
            </p>
          )}
        </div>

        {isError && (
          <p className="text-red-500 text-sm">
            {error?.message || "Failed to add project. Please try again."}
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
            "Add Project"
          )}
        </button>
      </form>
    </div>
  );
}
