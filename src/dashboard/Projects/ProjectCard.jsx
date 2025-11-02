import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ProjectCard({ id, title, status, dueDate }) {
  const statusColor = {
    "In Progress": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    Completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    Pending: "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400",
  }[status] || "bg-gray-100 text-gray-800";

  return (
    <Link to={`/projects/${id}`}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="p-5 bg-bg border border-muted/20 dark:border-muted/40 rounded-xl shadow-sm flex flex-col justify-between transition-all duration-300 cursor-pointer hover:shadow-lg"
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-text font-semibold text-base md:text-lg">{title}</h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
            {status}
          </span>
        </div>
        <p className="text-muted text-sm">Due: {dueDate}</p>
      </motion.div>
    </Link>
  );
}
