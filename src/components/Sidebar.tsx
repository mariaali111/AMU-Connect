// Sidebar.tsx
// Student-only, router-based sidebar (safe default export)

import {
  Home,
  BookOpen,
  Calendar,
  ListChecks,
  Bell,
  User,
  IndianRupee,
  MapPin,
  Landmark,
  LogOut,
  GraduationCap,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", icon: Home, path: "/student/dashboard" },
    { label: "Notes", icon: BookOpen, path: "/notes" },
    { label: "Timetable", icon: Calendar, path: "/timetable" },
    { label: "Assignments", icon: ListChecks, path: "/assignments" },
    { label: "Notices", icon: Bell, path: "/notices" },
    { label: "Fee Portal", icon: IndianRupee, path: "/fees" },
    { label: "Campus Map", icon: MapPin, path: "/campus-map" },
    { label: "About AMU", icon: Landmark, path: "/about-amu" },
    { label: "Profile", icon: User, path: "/profile" },
  ];

  const handleLogout = async () => {
    // optional: supabase.auth.signOut()
    navigate("/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 flex items-center gap-3 border-b">
        <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-500 rounded-lg flex items-center justify-center">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-semibold">AMU Connect</h3>
          <p className="text-sm text-gray-500">Student Portal</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                active
                  ? "bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
