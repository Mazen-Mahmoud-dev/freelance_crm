import ProjectCard from "./ProjectCard";

export default function ProjectList({ projects }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          title={project.title}
          status={project.status}
          dueDate={project.dueDate}
        />
      ))}
    </div>
  );
}
