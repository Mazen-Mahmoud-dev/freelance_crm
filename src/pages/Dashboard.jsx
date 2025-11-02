import { useAuth } from "../context/AuthContext";
import DashboardPage from "../dashboard/DashboardPage";
import AppLayout from "../layouts/AppLayout";

const Dashboard = () => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  // if (!user) return null; // مستخدم غير مسجل دخول

  return (
    <>
      <DashboardPage />
    </>
  );
};

export default Dashboard;
