import { useParams } from "react-router-dom";
import { useClient } from "../../hooks/useClients";
import Skeleton from "../../components/skeletons/Skeleton";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Building2, FileText, DollarSign } from "lucide-react";
import ClientProjectsSection from "../components/CLients/ClientsProjectsSection";
import { useProjectsByClient } from './../../hooks/useProjects';

const ClientDetails = () => {
  const { id } = useParams();
  const { data: client, isLoading, isError } = useClient(id);
  const { data: projects,  isLoading: projectsLoading } = useProjectsByClient(id);
  if (isLoading) return <Skeleton />;
  if (isError) return <div className="text-red-500">Failed to load client.</div>;
  if (!client) return <div className="text-gray-500">Client not found.</div>;

  const statusStyles = {
    Active: "bg-green-500/10 text-green-600 border-green-500/20",
    Lead: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    Inactive: "bg-red-500/10 text-red-600 border-red-500/20",
  };

  return (
    <div className="min-h-screen bg-bg p-6 md:p-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto bg-card border border-border rounded-2xl shadow-sm p-8 space-y-10"
      >

        {/* Profile Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
              {client.name.charAt(0)}
            </div>

            {/* Basic Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl font-bold text-foreground">
                  {client.name}
                </h1>

                <span
                  className={`px-3 py-1 text-xs rounded-full border ${statusStyles[client.status]}`}
                >
                  {client.status}
                </span>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                <div className="flex items-center gap-1">
                  <Mail size={14} />
                  {client.email}
                </div>
                {client.phone && (
                  <div className="flex items-center gap-1">
                    <Phone size={14} />
                    {client.phone}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Revenue Highlight */}
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 min-w-[220px]">
            <p className="text-sm text-muted-foreground mb-2">
              Total Revenue
            </p>
            <h2 className="text-3xl font-bold text-primary flex items-center gap-2">
              <DollarSign size={22} />
              {client.total_revenue || 0}
            </h2>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="bg-background border border-border rounded-xl p-6 hover:shadow-md transition">
            <p className="text-sm text-muted-foreground mb-1">
              Total Projects
            </p>
            <h3 className="text-2xl font-semibold text-foreground">
              {client.projects_count || 0}
            </h3>
          </div>

          <div className="bg-background border border-border rounded-xl p-6 hover:shadow-md transition">
            <p className="text-sm text-muted-foreground mb-1">
              Invoices
            </p>
            <h3 className="text-2xl font-semibold text-foreground">
              {client.invoices_count || 0}
            </h3>
          </div>

          <div className="bg-background border border-border rounded-xl p-6 hover:shadow-md transition">
            <p className="text-sm text-muted-foreground mb-1">
              Unpaid Amount
            </p>
            <h3
              className={`text-2xl font-semibold ${
                client.unpaid_amount > 0
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {client.unpaid_amount || 0}
            </h3>
          </div>
        </div>

        {/* Details Section */}
        <div className="grid md:grid-cols-2 gap-8 text-muted-foreground">

          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <Building2 size={18} />
              <div>
                <p className="text-sm text-gray-400">Company</p>
                <p className="text-foreground">{client.company || "—"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin size={18} />
              <div>
                <p className="text-sm text-gray-400">Address</p>
                <p className="text-foreground">{client.address || "—"}</p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FileText size={18} />
            <div>
              <p className="text-sm text-gray-400">Notes</p>
              <p className="text-foreground">
                {client.notes || "No additional notes."}
              </p>
            </div>
          </div>

        </div>

      </motion.div>

      <motion.div>
        <ClientProjectsSection projects={projects} loading={projectsLoading} />


      </motion.div>
    </div>
  );
};

export default ClientDetails;
