import { useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import { motion } from "framer-motion";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import Skeleton from "../../components/skeletons/Skeleton";

const TasksPage = () => {
  const { data: tasks, isLoading, isError } = useTasks(); // fetch all tasks
  const [selectedTask, setSelectedTask] = useState(null);
  console.log("tasks: ",tasks);
  
  if (isLoading) return <Skeleton />;
  if (isError) return <div className="text-red-500">Failed to load tasks.</div>;

  return (
    <div className="min-h-screen bg-bg p-6 md:p-10">
      <h1 className="text-4xl font-bold text-foreground mb-8">All Tasks</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks?.length > 0 ? (
          tasks.map(task => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-card border border-border rounded-xl flex flex-col justify-between gap-2 hover:shadow-md transition"
            >
              <div>
                <h2 className={task.completed ? "line-through text-gray-400" : "text-foreground font-semibold"}>
                  {task.title}
                </h2>
                {task.description && (
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                )}
              </div>

              <div className="flex justify-between items-center mt-2">
                <span
                  className={`px-2 py-1 text-xs rounded-md font-medium ${
                    task.completed ? "bg-green-200/50 text-green-700" : "bg-yellow-200/50 text-yellow-800"
                  }`}
                >
                  {task.completed ? "Done" : "Pending"}
                </span>

                <Link
                  to={`/dashboard/projects/${task.project_id}`}
                  className="text-blue-500 hover:underline text-sm"
                >
                  {task.project_name || "Project"}
                </Link>
              </div>

              {/* Optional Edit/Delete buttons */}
              <div className="flex justify-end gap-2 mt-2">
                <button className="p-2 rounded-lg hover:bg-accent transition">
                  <FiEdit className="w-4 h-4 text-blue-500" />
                </button>
                <button className="p-2 rounded-lg hover:bg-accent transition">
                  <FiTrash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-muted-foreground">No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default TasksPage;
