import ProjectList from "../Projects/ProjectList";
import { useAuth } from "../../context/AuthContext";
import Header from "../components/Header";
import SearchFilterBar from "../components/SearchFilterBar";

export default function ProjectsPage() {
  const { user } = useAuth();
  
  

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <Header title={"Project"} />

      {/* Search & Filter */}
      <SearchFilterBar title="projects" />


      {/* Project List */}
      <ProjectList userId={user?.id} />
    </div>
  );
}
