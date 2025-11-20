import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { FiEdit, FiPlus } from "react-icons/fi";
import EditTaskModal from "./EditTaskModal";
import AddTaskModal from './AddTaskModal';

const ProjectTasksSection = ({ project }) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-foreground">Tasks</h2>
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
        >
          <FiPlus /> Add Task
        </button>
      </div>

      <div className="space-y-3">
        {project.tasks?.length > 0 ? (
          project.tasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-accent rounded-xl border border-border flex justify-between items-center transition hover:shadow-md"
            >
              <div>
                <span className={task.completed ? "line-through text-gray-500" : "text-foreground font-medium"}>
                  {task.title}
                </span>
                {task.description && (
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 text-xs rounded-md font-medium ${
                    task.completed ? "bg-green-200/50 text-green-700" : "bg-yellow-200/50 text-yellow-800"
                  }`}
                >
                  {task.completed ? "Done" : "Pending"}
                </span>

                <button
                  onClick={() => { setSelectedTask(task); setIsEditOpen(true); }}
                  className="p-2 rounded-lg hover:bg-accent transition"
                >
                  <FiEdit className="w-4 h-4 text-blue-500" />
                </button>

                <button
                  onClick={() => project.deleteTask(task.id)}
                  className="p-2 rounded-lg hover:bg-accent transition"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-muted-foreground">No tasks added yet.</p>
        )}
      </div>

      {/* Modals */}
      <AddTaskModal
        projectId={project.id}
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
      />

      {selectedTask && (
        <EditTaskModal
          task={selectedTask}
          projectId={project.id}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </div>
  );
};

export default ProjectTasksSection;
