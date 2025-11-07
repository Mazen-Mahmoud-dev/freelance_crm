import { createBrowserRouter, Navigate } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import AppLayout from "../layouts/AppLayout";
import ProtectedRoute from "../components/ProtectedRoute";

// import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Auth from "../pages/Auth";
import Verify from "../pages/Verify";
import DashboardPage from "../dashboard/DashboardPage";
import ClientPage from "../dashboard/pages/ClientsPage";
import AddClient from "../dashboard/pages/AddClient";
import { AuthProvider } from "../context/AuthContext";
import ClientDetails from "../dashboard/pages/ClientDetails";
import ProjectsPage from "../dashboard/pages/ProjectsPage";

const router = createBrowserRouter([
  // 🟦 Public routes
  {
    element: (
    <AuthProvider>
      <PublicLayout />
    </AuthProvider>
    ),
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/auth",
        element: <Auth />,
      },{ path: "/auth/verify", element: <Verify /> }
    ],
  },
    

  // 🟩 Protected routes
  {
    element: (
      <AuthProvider>
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      </AuthProvider>
    ),
    children: [
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/dashboard/clients", element: <ClientPage />},
      { path: "/dashboard/clients/add",element: <AddClient />},
      {path: "/dashboard/clients/:id",element: <ClientDetails />},
      { path: "/dashboard/projects", element: <ProjectsPage />},
    ],
  },
  {
    element: <Navigate to="/" />, // Layout عام للصفحات المفتوحة
    children: [
      { path: "*", element: <Home /> },
      // { path: "/signup", element: <Signup /> },
    ],
  },
]);

export default router;
