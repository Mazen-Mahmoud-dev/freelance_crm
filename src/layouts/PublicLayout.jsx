import { Outlet } from "react-router-dom";
import HeaderGuest from "../components/HeaderGuest";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ScrollToTop />
      <HeaderGuest theme="light" />
      <main className="p-6 flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
