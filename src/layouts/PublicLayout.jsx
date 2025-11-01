import { Outlet } from "react-router-dom";
import HeaderGuest from "../components/HeaderGuest";
import Footer from "../components/Footer";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-background text-text-main">
      <HeaderGuest theme="light" />
      <main className="p-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
