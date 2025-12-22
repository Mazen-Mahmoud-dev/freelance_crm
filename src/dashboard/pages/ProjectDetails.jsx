import { useParams } from "react-router-dom";
import Skeleton from "../../components/skeletons/Skeleton";
import { useDeleteProject, useProject } from './../../hooks/useProjects';
import StatCard from "../../components/StatCard";
import { motion } from 'framer-motion';
import { useAuth } from "../../context/AuthContext";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import EditProjectModal from "../Projects/EditProjectModal";
import { FiEdit } from "react-icons/fi";
import Zoom from "react-medium-image-zoom";
import ProjectTasksSection from "../components/ProjectTasksSection";
import ConfirmDeleteModal from "../../components/modals/ConfirmDeleteModal";

const ProjectDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { data: project, projectLoading, isError } = useProject(user?.id, id);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { mutate: deleteProject, deleteLoading  } = useDeleteProject();
  const [OpenDeleteProjectModal, setOpenDeleteProjectModal] = useState(false);
  if (projectLoading) return <Skeleton />;
  if (isError) return <div className="text-red-500">Failed to load project.</div>;
  if (!project) return <div className="text-gray-500">Project not found.</div>;

  return (
    <div className="min-h-screen bg-bg p-6 md:p-10">
      <div className="max-w-5xl mx-auto bg-card shadow-lg rounded-2xl border border-border p-8">

        {/* HEADER */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold text-foreground tracking-tight">
              Project Title: {project.title}
            </h1>
            <p className="text-muted-foreground mt-1">
              Client: <span className="font-medium">{project.client_name}</span>
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIsEditOpen(true)}
              className="p-2 rounded-xl border border-border hover:bg-primary/30 transition flex items-center justify-center"
            >
              <FiEdit className="w-5 h-5 text-blue-500" />
            </button>

            <button
              onClick={() => setOpenDeleteProjectModal(true)}
              className="p-2 rounded-xl border border-border hover:bg-primary/30 transition flex items-center justify-center"
            >
              <Trash2 className="w-5 h-5 text-red-500" />
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <StatCard title="Tasks" value={project.tasks_count || 0} />
          <StatCard title="Completed" value={project.completed_tasks || 0} />
          <StatCard title="Progress" value={`${project.progress || 0}%`} />
        </div>

        {/* INFO SECTIONS */}
        <div className="grid md:grid-cols-2 gap-10 mb-12">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="text-lg font-medium text-foreground">{project.status || "—"}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Start Date</p>
              <p className="text-lg font-medium text-foreground">{project.start_date || "—"}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Due Date</p>
              <p className="text-lg font-medium text-foreground">{project.due_date || "—"}</p>
            </div>
          </motion.div>

          {/* DESCRIPTION */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <p className="text-sm text-muted-foreground">Description</p>
            <p className="text-foreground leading-relaxed">
              {project.description || "No description provided."}
            </p>
          </motion.div>
        </div>

        {/* TASKS */}
        {/* <div className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Tasks</h2>

          <div className="space-y-3">
            {project.tasks?.length > 0 ? (
              project.tasks.map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-accent rounded-xl border border-border flex justify-between items-center"
                >
                  <span className={task.completed ? "line-through text-gray-500" : ""}>
                    {task.title}
                  </span>

                  <span
                    className={`px-2 py-1 text-xs rounded-md font-medium ${
                      task.completed
                        ? "bg-green-200/50 text-green-700"
                        : "bg-yellow-200/50 text-yellow-800"
                    }`}
                  >
                    {task.completed ? "Done" : "Pending"}
                  </span>
                </motion.div>
              ))
            ) : (
              <p className="text-muted-foreground">No tasks added yet.</p>
            )}
          </div>
        </div> */}
        <ProjectTasksSection project={project} />
        {/* FILES */}
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Files</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {project.attachments?.length > 0 ? (
              project.attachments.map((file, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="group relative bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
                >
                  <Zoom>
                    <img
                      src={file}
                      alt="attachment"
                      className="w-full h-32 object-cover group-hover:opacity-80 transition"
                    />
                  </Zoom>
                </motion.div>
              ))
            ) : (
              <p className="text-muted-foreground">No files uploaded.</p>
            )}
          </div>
        </div>
      </div>

      <EditProjectModal project={project} isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />
      <ConfirmDeleteModal
        item={project}
        isOpen={OpenDeleteProjectModal}
        onClose={() => setOpenDeleteProjectModal(false)}
        deleteMutation={{ mutate: deleteProject,isLoading: deleteLoading }}
        title="Delete Project"
        onSuccessRedirect="/dashboard/projects"
      />
    </div>
  );
};

export default ProjectDetails;
