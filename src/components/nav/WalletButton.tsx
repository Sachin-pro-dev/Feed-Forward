
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function WalletButton() {
  return (
    <Button 
      asChild 
      variant="ghost" 
      size="icon"
    >
      <Link to="/wallet">
        <Wallet className="h-5 w-5" />
      </Link>
    </Button>
  );
}
