import StatCard from "../../components/StatCard";

const ProjectStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
      <StatCard title="Tasks" value={stats.tasksCount} />
      <StatCard title="Completed" value={stats.completed} />
      <StatCard title="Progress" value={`${stats.progress}%`} />
    </div>
  );
};

export default ProjectStats;