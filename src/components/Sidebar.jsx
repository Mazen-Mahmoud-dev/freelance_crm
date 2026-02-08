// Sidebar.jsx
import { Link, NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Folder, CheckSquare, Settings, X , Receipt} from "lucide-react";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/dashboard/clients", label: "Clients", icon: Users },
  { to: "/dashboard/projects", label: "Projects", icon: Folder },
  { to: "/dashboard/invoices", label: "Invoices", icon: Receipt },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <aside
      className={`
        fixed top-0 left-0 h-full w-64 z-50
        bg-bg text-[var(--color-text)]
        border-r border-[var(--color-muted)]/20
        flex flex-col justify-start
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
    >
      {/* Header (logo + close button on mobile) */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-muted)]/20">
        <Link to="/dashboard" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">Freelance</span>
          <span className="text-muted font-medium">CRM</span>
        </Link>
        <button
          onClick={onClose}
          className="p-2 rounded-md hover:bg-primary/10 md:hidden"
        >
          <X className="w-5 h-5 text-primary" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col mt-5">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/dashboard"}
            className={({ isActive }) =>
              `
              flex items-center gap-3 px-6 py-3
              font-medium transition-all duration-200
              ${
                isActive
                  ? "bg-primary/10 text-primary border-r-4 border-primary"
                  : "hover:bg-primary/5 text-[var(--color-text)]"
              }
            `
            }
          >
            <Icon className="w-5 h-5" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 mt-auto text-center text-sm text-muted border-t border-[var(--color-muted)]/20">
        © {new Date().getFullYear()} Freelance CRM
      </div>
    </aside>
  );
};

export default Sidebar;
