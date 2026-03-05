import { useParams } from "react-router-dom";
import Skeleton from "../../components/skeletons/Skeleton";
import { useDeleteProject, useProject } from './../../hooks/useProjects';
import { useAuth } from "../../context/AuthContext";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import EditProjectModal from "../Projects/EditProjectModal";
import { FiEdit } from "react-icons/fi";
import Zoom from "react-medium-image-zoom";
import ProjectTasksSection from "../components/ProjectTasksSection";
import ConfirmDeleteModal from "../../components/modals/ConfirmDeleteModal";
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import ProjectHeader from "../components/ProjectHeader";
import { useProjectStats } from "../../hooks/useProjectStats";
import ProjectStats from "../components/ProjectStats";
import TasksPage from "./TasksPage";

const ProjectDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { data: project, isLoading: projectLoading, isError } = useProject(user?.id, id);
  const stats = useProjectStats(id);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { mutate: deleteProject, deleteLoading  } = useDeleteProject();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  if (projectLoading) return <Skeleton />;
  if (isError) return <div className="text-red-500">Failed to load project.</div>;
  if (!project) return <div className="text-gray-500">Project Loading.</div>;
  return (
    <div className="min-h-screen bg-bg p-6 md:p-10">
      <div className="max-w-5xl mx-auto bg-card shadow-lg rounded-2xl border border-border p-8">

        <ProjectHeader
          project={project}
          onEdit={() => setIsEditOpen(true)}
          onDelete={() => setIsDeleteModalOpen(true)}
        />

        {/* STATS */}
        <ProjectStats stats={stats} />

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

        <TasksPage project={project} />

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
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        deleteMutation={{ mutate: deleteProject,isLoading: deleteLoading }}
        title="Delete Project"
        onSuccessRedirect="/dashboard/projects"
      />
    </div>
  );
};

export default ProjectDetails;
