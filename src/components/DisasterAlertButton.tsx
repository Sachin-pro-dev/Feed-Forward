
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

export function DisasterAlertButton() {
  const [isBlinking, setIsBlinking] = useState(true);
  
  // Blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(prev => !prev);
    }, 800);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Button
      asChild
      variant="outline"
      className={`transition-colors duration-300 ${
        isBlinking
          ? "bg-red-600 text-white hover:bg-red-700 border-red-600"
          : "bg-white text-red-600 hover:bg-red-50 border-red-600"
      }`}
    >
      <Link to="/sanjeevani">
        <AlertTriangle className="mr-2 h-4 w-4" />
        SANJEEVANI
      </Link>
    </Button>
  );
}
