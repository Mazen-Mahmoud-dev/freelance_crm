import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { useClients } from "../../hooks/useClients";
import ClientsTable from "../components/ClientsTable";
import ClientsCard from "../components/ClientsCard";
import SearchFilterBar from "../components/SearchFilterBar";
import Skeleton from "../../components/skeletons/Skeleton";
import { useMemo, useState } from "react";

export default function ClientsPage() {
  const { data: clients = [], isLoading, isError } = useClients();
  const [searchQuery, setSearchQuery] = useState("");
  const filteredClients = useMemo(() => {
    return clients.filter((client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [clients, searchQuery]);
  
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start flex-wrap gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold text-text">Clients</h2>
          <p className="text-muted">
            Manage your clients and monitor active projects.
          </p>
        </div>
        <Link
          to="add"
          className="bg-primary text-white px-5 py-3 flex items-center gap-2 rounded-lg shadow hover:scale-[1.02] transition-all"
        >
          <Plus size={18} /> Add Client
        </Link>
      </div>

      {/* Search & Filter */}
      <SearchFilterBar onSearch={setSearchQuery}  />

      {/* Loading / Error */}
      {isLoading && <Skeleton />}
      {isError && <p className="text-center text-red-500">Failed to load clients.</p>}

      {/* View */}
      {!isLoading && !isError && (
        <>
          <div className="hidden md:block">
            <ClientsTable clients={filteredClients} loading={isLoading} />
          </div>

          <div className="block md:hidden">
            <ClientsCard clients={filteredClients} loading={isLoading} />
          </div>
        </>
      )}
    </div>
  );
}
