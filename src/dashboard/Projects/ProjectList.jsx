import React from "react";
import ProjectCard from "./ProjectCard";
import { useProjects } from "../../hooks/useProjects";
import { Loader2 } from "lucide-react";

export default function ProjectList({ userId }) {
  const { data: projects, isLoading, isError, error } = useProjects(userId);
  console.log("type of user id: ", typeof(userId));
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="w-6 h-6 animate-spin text-zinc-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 border border-red-500/30 bg-red-500/10 text-red-600 rounded-xl text-center">
        Failed to load projects: {error.message}
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="p-6 border rounded-xl text-center text-zinc-500 dark:text-zinc-400">
        No projects found yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
