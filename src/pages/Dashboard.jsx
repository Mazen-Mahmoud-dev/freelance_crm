import { useAuth } from "../context/AuthContext";
import AppLayout from "../layouts/AppLayout";

const Dashboard = () => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  // if (!user) return null; // مستخدم غير مسجل دخول

  return (
    <AppLayout>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-card rounded shadow bg-primary-light text-background">
          Client Card
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
