
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Bell, User, MapPin, LogOut, Wallet, Settings, ShoppingBag, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { ConnectWallet } from "./ConnectWallet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface NavItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const navItems: NavItem[] = [
    { title: "Home", href: "/" },
    { title: "Food Map", href: "/map", icon: <MapPin className="h-4 w-4" /> },
    { title: "Donate Food", href: "/donate" },
    { title: "Marketplace", href: "/marketplace", icon: <ShoppingBag className="h-4 w-4" /> },
  ];

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

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
          <div className="hidden md:flex gap-6">
            {navItems.map((item) => (
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
        </div>

        <div className="flex items-center gap-4">
          <ConnectWallet />
          
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

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <User className="h-5 w-5" />
                    <span className="absolute bottom-0 right-0 w-2 h-2 bg-ff-green rounded-full"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => navigate("/wallet")}>
                      <Wallet className="mr-2 h-4 w-4" />
                      <span>My Wallet</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/marketplace")}>
                      <Award className="mr-2 h-4 w-4" />
                      <span>Marketplace</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/settings")}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button asChild className="hidden md:inline-flex btn-gradient animate-fade-in">
              <Link to="/login">Sign In</Link>
            </Button>
          )}

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pr-0">
              <div className="px-7">
                <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                  <span className="font-bold text-2xl gradient-text">FeedForward</span>
                </Link>
              </div>
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center py-2 px-7 text-base font-medium transition-colors hover:text-primary"
                    )}
                  >
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.title}
                  </Link>
                ))}
                
                {isAuthenticated ? (
                  <>
                    <Link 
                      to="/wallet"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center py-2 px-7 text-base font-medium transition-colors hover:text-primary"
                    >
                      <Wallet className="mr-2 h-4 w-4" />
                      My Wallet
                    </Link>
                    <Link 
                      to="/profile"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center py-2 px-7 text-base font-medium transition-colors hover:text-primary"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="flex items-center py-2 px-7 text-base font-medium transition-colors hover:text-primary text-left"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log Out
                    </button>
                  </>
                ) : (
                  <Button asChild className="mx-7 mt-4 btn-gradient animate-fade-in">
                    <Link to="/login" onClick={() => setIsOpen(false)}>Sign In</Link>
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
