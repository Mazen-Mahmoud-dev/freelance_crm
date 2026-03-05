// components/ProjectHeader.jsx
import { Trash2 } from "lucide-react";
import { FiEdit } from "react-icons/fi";

const ProjectHeader = ({ project, onEdit, onDelete }) => {
  return (
    <div className="flex items-start justify-between mb-10">
      <div>
        <h1 className="text-4xl font-bold text-foreground tracking-tight">
          {project.title}
        </h1>
        <p className="text-sm mt-1">{project.client_name}</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="p-2 rounded-xl border border-border hover:bg-primary/30 transition"
        >
          <FiEdit className="w-5 h-5 text-blue-500" />
        </button>

        <button
          onClick={onDelete}
          className="p-2 rounded-xl border border-border hover:bg-primary/30 transition"
        >
          <Trash2 className="w-5 h-5 text-red-500" />
        </button>
      </div>
    </div>
  );
};

export default ProjectHeader;