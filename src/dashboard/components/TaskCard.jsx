import { FiEdit, FiTrash2 } from "react-icons/fi";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { taskStatusStyles } from "../../utils/taskStatusStyles";

const TaskCard = ({ task, onEdit, onDelete }) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-card border border-border rounded-xl flex flex-col justify-between gap-2 hover:shadow-md transition"
    >
      <div>
        <h2 className={`font-semibold ${task.completed ? "line-through text-gray-400" : "text-foreground"}`}>
          {task.title}
        </h2>

        {task.description && (
          <p className="text-sm text-muted-foreground">
            {task.description}
          </p>
        )}
      </div>

      <div className="flex justify-between items-center mt-2">

        <span className={`px-2 py-1 text-xs rounded-md font-medium ${taskStatusStyles[task.status]}`}>
          {task.status}
        </span>

        <span className="text-gray-400 text-sm">
          {task?.due_date || ""}
        </span>

      </div>

      <div className="flex justify-end gap-2 mt-3">

        <button
          onClick={() => onEdit(task)}
          className="p-2 rounded-lg hover:bg-gray-200/40 transition"
        >
          <FiEdit className="w-4 h-4 text-primary" />
        </button>

        <button
          onClick={() => onDelete(task)}
          className="p-2 rounded-lg hover:bg-gray-200/40 transition"
        >
          <FiTrash2 className="w-4 h-4 text-red-500" />
        </button>

      </div>

    </motion.div>
  );
};

export default TaskCard;