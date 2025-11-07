import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { useClients } from "../../hooks/useClients";
import ClientsTable from "../components/CLients/ClientsTable";
import SearchFilterBar from "../components/SearchFilterBar";
import Skeleton from "../../components/skeletons/Skeleton";
import { useMemo, useState } from "react";
import ClientsCard from './../components/CLients/ClientsCard';
import Header from "../components/Header";

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
      <Header title="Client" />

      {/* Search & Filter */}
      <SearchFilterBar onSearch={setSearchQuery} title={"clients"}  />

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
