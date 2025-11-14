import { motion } from "framer-motion";
import { ImageIcon, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import DeleteProjectModal from "./DeleteProjectModal";

const statusColors = {
  active: "bg-green-500/10 text-green-500 border-green-500/20",
  completed: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  archived: "bg-gray-500/10 text-gray-400 border-gray-500/20",
};

export default function ProjectCard({ project }) {
  const {id, title, description, client_name, status, thumbnail_url } = project;
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="relative group flex flex-col overflow-hidden border border-zinc-200 dark:border-primary rounded-2xl bg-bg dark:bg-zinc-900 shadow-sm hover:shadow-lg hover:border-primary transition-all duration-300"
    >
      {/* Thumbnail */}
      <div className="relative w-full h-40 overflow-hidden">
        {thumbnail_url ? (
          <motion.img
            src={thumbnail_url}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-100 dark:bg-primary text-zinc-400">
            <ImageIcon className="w-8 h-8" />
          </div>
        )}

        {/* Action buttons (show + delete) */}
        <motion.div
          initial={{ opacity: .75, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100"
        >
          <Link to={`${id}`}
            className="p-2 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm hover:bg-primary hover:text-white transition"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-2 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm hover:bg-red-500 hover:text-white transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-base truncate">{title}</h3>
          <span
            className={`capitalize px-3 py-1 rounded-full text-xs font-medium border ${statusColors[status] || statusColors.active}`}
          >
            {status}
          </span>
        </div>

        <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-3">
          {description || "No description provided."}
        </p>

        <div className="mt-auto flex justify-between items-center text-xs text-zinc-500 dark:text-zinc-400">
          <span>Client: {client_name || "Unknown Client"}</span>
        </div>
      </div>

      {/* Delete Project Modal */}
      <DeleteProjectModal
        project={project}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </motion.div>
  );
}
