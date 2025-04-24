
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function NotificationButton() {
  const navigate = useNavigate();
  
  return (
    <Button 
      variant="ghost" 
      size="icon"
      className="relative animate-fade-in"
      onClick={() => navigate("/notifications")}
    >
      <Bell className="h-5 w-5" />
      <span className="absolute -top-1 -right-1 bg-ff-orange text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
        2
      </span>
    </Button>
  );
}
