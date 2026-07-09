import { NavLink, Outlet } from "react-router-dom";
import {
  FaHome,
  FaUserGraduate,
  FaBook,
  FaClipboardList,
  FaRobot,
} from "react-icons/fa";

export default function MainLayout() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-2 rounded-lg transition ${
      isActive
        ? "text-gray-300 hover:bg-slate-800"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white shadow-xl p-5">
        <h1 className="text-xl font-bold mb-6">
          Student Allocation
        </h1>

        <nav className="space-y-2">
          <NavLink to="/dashboard" className={linkClass}>
          <FaHome className="mr-2" />
            Dashboard
          </NavLink>

          <NavLink to="/students" className={linkClass}>
          <FaUserGraduate className="mr-2" />
            Students
          </NavLink>

          <NavLink to="/courses" className={linkClass}>
          <FaBook className="mr-2" />
            Courses
          </NavLink>

          <NavLink to="/preferences" className={linkClass}>
          <FaClipboardList className="mr-2" />
            Preferences
          </NavLink>

          <NavLink to="/reservations" className={linkClass}>
          <FaClipboardList className="mr-2" />
            Reservations
          </NavLink>

          <NavLink to="/allocation" className={linkClass}>
          <FaClipboardList className="mr-2" />
            Allocation
          </NavLink>

          <NavLink to="/ai" className={linkClass}>
          <FaRobot className="mr-2" />
            AI Assistant
          </NavLink>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}