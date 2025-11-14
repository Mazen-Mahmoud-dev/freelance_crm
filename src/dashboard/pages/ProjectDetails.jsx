import { useParams } from "react-router-dom"
import Skeleton from "../../components/skeletons/Skeleton"
import { useProject } from './../../hooks/useProjects';
import StatCard from "../../components/StatCard";
import { motion } from 'framer-motion';
import { useAuth } from "../../context/AuthContext";
import { Trash2 } from "lucide-react";
import DeleteProjectModal from "../Projects/DeleteProjectModal";
import { useState } from "react";

const ProjectDetails = () => {
  const { id } = useParams();
  const { user } = useAuth()
  const { data: project, isLoading, isError } = useProject(user?.id,id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  
  if (isLoading) return <Skeleton />;
  if (isError) return <div className="text-red-500">Failed to load project.</div>;
  if (!project) return <div className="text-gray-500">Project not found.</div>;

  return (
    <div className="min-h-screen bg-bg p-6 md:p-10">
      <div className="max-w-4xl mx-auto bg-card shadow-lg rounded-2xl border border-border p-8 transition-colors">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{project.name}</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Client: <span className="font-medium">{project.client_name}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">
              Edit Project
            </button>
            <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <StatCard title="Tasks" value={project.tasks_count || 0} />
          <StatCard title="Completed" value={project.completed_tasks || 0} />
          <StatCard title="Progress" value={`${project.progress || 0}%`} />
        </div>

        {/* Details Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 text-text mb-10"
        >
          <div>
            <h2 className="font-semibold text-lg mb-1 text-foreground">Status</h2>
            <p className="text-muted-foreground">{project.status || "—"}</p>
          </div>
          <div>
            <h2 className="font-semibold text-lg mb-1 text-foreground">Start Date</h2>
            <p className="text-muted-foreground">{project.start_date || "—"}</p>
          </div>
          <div>
            <h2 className="font-semibold text-lg mb-1 text-foreground">Due Date</h2>
            <p className="text-muted-foreground">{project.due_date || "—"}</p>
          </div>
          <div>
            <h2 className="font-semibold text-lg mb-1 text-foreground">Description</h2>
            <p className="text-muted-foreground">
              {project.description || "No description provided."}
            </p>
          </div>
        </motion.div>

        {/* Tasks Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Tasks</h2>
          <div className="space-y-2">
            {project.tasks?.length > 0 ? (
              project.tasks.map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 bg-card border border-border rounded-lg flex justify-between items-center"
                >
                  <span className={task.completed ? "line-through text-gray-400" : ""}>
                    {task.title}
                  </span>
                  <span className={`px-2 py-1 text-sm rounded ${
                    task.completed ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {task.completed ? "Done" : "Pending"}
                  </span>
                </motion.div>
              ))
            ) : (
              <p className="text-muted-foreground">No tasks added yet.</p>
            )}
          </div>
        </div>

        {/* Files Section */}
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Files</h2>
          <div className="space-y-2 flex flex-wrap gap-2 justify-evenly">
            {project.attachments?.length > 0 ? (
              project.attachments.map((file,index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-card border-2 border-primary rounded-lg transition w-36"
                >
                  <img src={file} alt="attachments" className="w-full h-full object-cover" />
                </motion.div>
              ))
            ) : (
              <p className="text-muted-foreground">No files uploaded.</p>
            )}
          </div>
        </div>
      </div>



      {/* Delete Project Modal */}
      <DeleteProjectModal
        project={project}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

export default ProjectDetails
