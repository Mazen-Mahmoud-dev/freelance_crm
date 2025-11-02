import { Plus } from "lucide-react";
import ClientsTable from "../components/ClientsTable";
import ClientsCard from "../components/ClientsCard";
import SearchFilterBar from "../components/SearchFilterBar";
import { useEffect, useState } from "react";
import Skeleton from "../../components/skeletons/Skeleton";

export default function ClientsPage() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 1500);
      return () => clearTimeout(timer);
    }, []);
  return (
    <div className="p-section space-y-8 mt-12 p-8 bg-primary/10 rounded-md mx-2">
      {loading ? <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  {<Skeleton />}
                </div>: 
      <div className="flex justify-between items-start flex-wrap gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold text-text">Clients</h2>
          <p className="text-muted">
            Manage your clients and monitor active projects.
          </p>
        </div>
        <button className="bg-primary text-white px-5 py-3 flex items-center gap-2 rounded-lg shadow hover:scale-[1.02] transition-all">
          <Plus size={18} /> Add Client
        </button>
      </div>
      }
      {/* Header */}
      

      {loading ? <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  {<Skeleton />}
                </div> :  <SearchFilterBar />
      }

      {loading ? <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  {<Skeleton />}
                </div> :
        <div className="hidden md:block">
          <ClientsTable />
        </div> }

      {loading ? <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {<Skeleton />}
              </div> : 
      <div className="block md:hidden">
        <ClientsCard /> 
      </div>
      }
    </div>
  );
}
