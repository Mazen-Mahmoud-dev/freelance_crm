import { Outlet } from "react-router-dom";
import HeaderGuest from "../components/HeaderGuest";
import Footer from "../components/Footer";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <HeaderGuest theme="light" />
      <main className="p-6 flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
