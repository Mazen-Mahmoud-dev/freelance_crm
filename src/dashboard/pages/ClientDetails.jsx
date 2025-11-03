import { useParams } from "react-router-dom";
import { useClient } from "../../hooks/useClients";
import Skeleton from "../../components/skeletons/Skeleton";

const ClientDetails = () => {
  const { id } = useParams(); // جاي من رابط زي /clients/:id
  const { data: client, isLoading, isError } = useClient(id);
  console.log(client);
  
  if (isLoading) return <Skeleton />;
  if (isError) return <div className="text-red-500">Failed to load client.</div>;
  if (!client) return <div className="text-gray-500">Client not found.</div>;
  return (
    <div>
      {client.name}
      {client.email}
    </div>
  )
}

export default ClientDetails
