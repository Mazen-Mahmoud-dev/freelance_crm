import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import AppLayout from "../layouts/AppLayout";
import ProtectedRoute from "../components/ProtectedRoute";

// import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Auth from "../pages/Auth";
import Verify from "../pages/Verify";
import DashboardPage from "../dashboard/DashboardPage";

const router = createBrowserRouter([
  // 🟦 Public routes
  {
    element: <PublicLayout />,
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
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/dashboard", element: <DashboardPage /> },
    ],
  },
  {
    element: <h2>404 page not found</h2>, // Layout عام للصفحات المفتوحة
    children: [
      { path: "*", element: <Home /> },
      // { path: "/signup", element: <Signup /> },
    ],
  },
]);

export default router;
