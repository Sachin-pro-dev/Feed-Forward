
import { Link } from "react-router-dom";
import { MapPin, Award, ShoppingBag, BarChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface NavItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
  protected?: boolean;
}

const navItems: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "Food Map", href: "/map", icon: <MapPin className="h-4 w-4" /> },
  { title: "Donate Food", href: "/donate" },
  { 
    title: "Farmer Donations", 
    href: "/farmer-donations",
    icon: <Award className="h-4 w-4" />,
    protected: true 
  },
  { 
    title: "Marketplace", 
    href: "/marketplace", 
    icon: <ShoppingBag className="h-4 w-4" />,
    protected: true 
  },
  { 
    title: "Community Impact", 
    href: "/impact", 
    icon: <BarChart className="h-4 w-4" />,
    protected: false 
  },
];

export function NavLinks() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="hidden md:flex gap-6">
      {navItems
        .filter(item => !item.protected || isAuthenticated)
        .map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="flex items-center text-sm font-medium transition-all hover:text-primary hover:scale-105"
          >
            {item.icon && <span className="mr-1">{item.icon}</span>}
            {item.title}
          </Link>
        ))}
    </div>
  );
}
