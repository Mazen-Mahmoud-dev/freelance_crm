import { useParams } from "react-router-dom";
import { useClient } from "../../hooks/useClients";
import Skeleton from "../../components/skeletons/Skeleton";
import { motion } from "framer-motion";
import StatCard from "../../components/StatCard";

const ClientDetails = () => {
  const { id } = useParams();
  const { data: client, isLoading, isError } = useClient(id);

  if (isLoading) return <Skeleton />;
  if (isError) return <div className="text-red-500">Failed to load client.</div>;
  if (!client) return <div className="text-gray-500">Client not found.</div>;

  return (
    <div className="min-h-screen bg-bg p-6 md:p-10">
      <div className="max-w-4xl mx-auto bg-card shadow-lg rounded-2xl border border-border p-8 transition-colors">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{client.name}</h1>
            <p className="text-gray-500 dark:text-gray-400">{client.email}</p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">
            Edit Client
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Projects" value={client.projects_count || 0} />
          <StatCard title="Invoices" value={client.invoices_count || 0} />
          <StatCard title="Total Revenue" value={`$${client.total_revenue || 0}`} />
        </div>

        {/* Details Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 text-gray-700 dark:text-gray-300"
        >
          <div>
            <h2 className="font-semibold text-lg mb-1 text-foreground">Company</h2>
            <p className="text-muted-foreground">{client.company || "—"}</p>
          </div>
          <div>
            <h2 className="font-semibold text-lg mb-1 text-foreground">Phone</h2>
            <p className="text-muted-foreground">{client.phone || "—"}</p>
          </div>
          <div>
            <h2 className="font-semibold text-lg mb-1 text-foreground">Address</h2>
            <p className="text-muted-foreground">{client.address || "—"}</p>
          </div>
          <div>
            <h2 className="font-semibold text-lg mb-1 text-foreground">Notes</h2>
            <p className="text-muted-foreground">
              {client.notes || "No additional notes."}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ClientDetails;
