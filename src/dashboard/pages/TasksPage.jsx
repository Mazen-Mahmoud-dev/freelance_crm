import { useState, useMemo } from "react";
import { useDeleteTask, useTasks } from "../../hooks/useTasks";
import { motion } from "framer-motion";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import Skeleton from "../../components/skeletons/Skeleton";
import ConfirmDeleteModal from "../../components/modals/ConfirmDeleteModal";

const TasksPage = () => {
  const { data: tasks, isLoading, isError } = useTasks();
  console.log("tasks: ",tasks);
  
  const [openSort, setOpenSort] = useState(false);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const { mutate: deleteTask,isModalLoading } = useDeleteTask();
  const [OpenDeleteTaskModal, setOpenDeleteTaskModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  // Filtering
  const filteredTasks = useMemo(() => {
    let filtered = [...(tasks || [])];

    if (filter === "pending") filtered = filtered.filter(t => !t.completed);
    if (filter === "done") filtered = filtered.filter(t => t.completed);

    // Sorting
    if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    } else if (sortBy === "az") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [tasks, filter, sortBy]);
  if (isLoading) return <Skeleton />;
  if (isError) return <div className="text-red-500">Failed to load tasks.</div>;
  
  
  

  return (
    <div className="min-h-screen bg-bg p-6 md:p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-foreground">Tasks</h1>
        <Link
          to="/dashboard/tasks/add"
          className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition"
        >
          Add Task
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-md border ${
              filter === "all"
                ? "bg-primary text-white"
                : "bg-card border-border text-foreground"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("pending")}
            className={`px-3 py-1 rounded-md border ${
              filter === "pending"
                ? "bg-primary text-white"
                : "bg-card border-border text-foreground"
            }`}
          >
            Pending
          </button>

          <button
            onClick={() => setFilter("done")}
            className={`px-3 py-1 rounded-md border ${
              filter === "done"
                ? "bg-primary text-white"
                : "bg-card border-border text-foreground"
            }`}
          >
            Done
          </button>
        </div>

        <div className="relative z-30 flex items-center gap-4">
          Sort By: 
          <button
            onClick={() => setOpenSort(prev => !prev)}
            className="px-4 py-2 bg-card border border-border rounded-md text-sm text-foreground flex items-center gap-2 hover:bg-gray-300 transition"
          >
            {sortBy === "newest" ? "Newest" : sortBy === "oldest" ? "Oldest" : "A → Z"}
            <span className="text-xs opacity-70">▼</span>
          </button>

          {openSort && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute right-0 top-11 mt-2 w-40 bg-card border border-border rounded-lg shadow-lg z-10 overflow-hidden bg-bg"
            >
              <button
                onClick={() => {
                  setSortBy("newest");
                  setOpenSort(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-300 transition ${
                  sortBy === "newest" ? "bg-gray-300 text-primary font-medium" : ""
                }`}
              >
                Newest
              </button>

              <button
                onClick={() => {
                  setSortBy("oldest");
                  setOpenSort(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-300 transition ${
                  sortBy === "oldest" ? "bg-gray-300 text-primary font-medium" : ""
                }`}
              >
                Oldest
              </button>

              <button
                onClick={() => {
                  setSortBy("az");
                  setOpenSort(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-300 transition ${
                  sortBy === "az" ? "bg-gray-300 text-primary font-medium" : ""
                }`}
              >
                A → Z
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Tasks Grid */}
      {filteredTasks?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map(task => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-card border border-border rounded-xl flex flex-col justify-between gap-2 hover:shadow-md transition"
            >
              <div>
                <h2
                  className={`font-semibold ${
                    task.completed
                      ? "line-through text-gray-400"
                      : "text-foreground"
                  }`}
                >
                  {task.title}
                </h2>

                {task.description && (
                  <p className="text-sm text-muted-foreground">
                    {task.description}
                  </p>
                )}
              </div>

              {/* Status & Project */}
              <div className="flex justify-between items-center mt-2">
                <span
                  className={`px-2 py-1 text-xs rounded-md font-medium shadow-header ${
                    task.completed
                      ? "bg-green-200/50 text-green-700"
                      : "bg-yellow-200/50 text-yellow-800"
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

              {/* Edit / Delete */}
              <div className="flex justify-end gap-2 mt-3">
                <button className="p-2 rounded-lg hover:bg-gray-200/40 transition">
                  <FiEdit className="w-4 h-4 text-primary" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-200/40 transition" 
                  onClick={() => {
                    setTaskToDelete(task);
                    console.log(taskToDelete);
                    if (!task?.id) return alert("Cannot delete task without ID");
                    setOpenDeleteTaskModal(true);
                  }}>
                  <FiTrash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>

              

            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg">No tasks yet.</p>
          <Link
            to="/dashboard/tasks/add"
            className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition"
          >
            Create your first task
          </Link>
        </div>
      )}
      {taskToDelete && (<ConfirmDeleteModal
        item={taskToDelete}
        isOpen={OpenDeleteTaskModal}
        onClose={() => setOpenDeleteTaskModal(false)}
        deleteMutation={{ mutate: deleteTask, isModalLoading }}
        title="Delete Task"
      />)
      }
      
    </div>
  );
};

export default TasksPage;