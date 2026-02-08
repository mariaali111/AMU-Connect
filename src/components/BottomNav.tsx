import { Home, BookOpen, Calendar, Bell, User } from "lucide-react";

interface BottomNavProps {
  currentScreen?: string;
  onNavigate?: (screen: string) => void;
  userRole?: "student" | "professor";
}

const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen = "dashboard",
  onNavigate,
  userRole = "student",
}) => {
  const studentNavItems = [
    { id: "dashboard", label: "Home", icon: Home },
    { id: "notes", label: "Notes", icon: BookOpen },
    { id: "timetable", label: "Schedule", icon: Calendar },
    { id: "notices", label: "Notices", icon: Bell },
    { id: "profile", label: "Profile", icon: User },
  ];

  const navItems = studentNavItems;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate?.(item.id)}
              className={`flex flex-col items-center text-xs ${
                isActive ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
