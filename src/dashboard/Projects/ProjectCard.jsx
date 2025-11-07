import React from "react";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";

const statusColors = {
  active: "bg-green-500/10 text-green-500 border-green-500/20",
  completed: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  archived: "bg-gray-500/10 text-gray-400 border-gray-500/20",
};

export default function ProjectCard({ project }) {
  const { title, description, client_name, status, image_url } = project;

  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.2 }}
      className="flex items-center justify-between w-full p-4 border rounded-2xl bg-white dark:bg-zinc-900 hover:border-indigo-500/50 transition-colors"
    >
      {/* Left side: Thumbnail */}
      <div className="flex items-center gap-4 w-full">
        {image_url ? (
          <img
            src={image_url}
            alt={title}
            className="w-16 h-16 rounded-xl object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
            <ImageIcon className="w-5 h-5" />
          </div>
        )}

        {/* Center: title + description */}
        <div className="flex-1 overflow-hidden">
          <h3 className="font-medium text-base truncate">{title}</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2">
            {description || "No description provided."}
          </p>
        </div>
      </div>

      {/* Right side: status + client */}
      <div className="flex flex-col items-end justify-between h-full">
        <span
          className={`capitalize px-3 py-1 rounded-full text-xs font-medium border ${statusColors[status] || statusColors.active}`}
        >
          {status}
        </span>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-3">
          {client_name || "Unknown Client"}
        </p>
      </div>
    </motion.div>
  );
}
