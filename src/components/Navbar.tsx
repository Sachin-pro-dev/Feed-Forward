
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, Wallet } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { ConnectWallet } from "./ConnectWallet";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { NavLinks } from "./nav/NavLinks";
import { UserMenu } from "./nav/UserMenu";
import { MobileMenu } from "./nav/MobileMenu";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <nav className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-8">
          <Link 
            to="/" 
            className="flex items-center space-x-2 transition-transform hover:scale-105"
          >
            <span className="font-bold text-2xl gradient-text">FeedForward</span>
          </Link>
          <NavLinks />
        </div>

        <div className="flex items-center gap-4">
          <ConnectWallet />
          <ThemeSwitcher />
          
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
          
          {isAuthenticated ? (
            <>
              <Button 
                asChild 
                variant="ghost" 
                size="icon"
                onClick={() => navigate("/wallet")}
              >
                <Link to="/wallet">
                  <Wallet className="h-5 w-5" />
                </Link>
              </Button>
              <UserMenu />
            </>
          ) : (
            <Button asChild className="hidden md:inline-flex btn-gradient animate-fade-in">
              <Link to="/login">Sign In</Link>
            </Button>
          )}

          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
