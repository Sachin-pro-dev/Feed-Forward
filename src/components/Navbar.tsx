
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, X, Bell, User, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems: NavItem[] = [
    { 
      title: "Home", 
      href: "/" 
    },
    { 
      title: "Food Map", 
      href: "/map", 
      icon: <MapPin className="h-4 w-4" /> 
    },
    { 
      title: "Donate Food", 
      href: "/donate" 
    },
    { 
      title: "About", 
      href: "/about" 
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <nav className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-8">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-2xl gradient-text">FeedForward</span>
          </Link>
          <div className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center text-sm font-medium transition-colors hover:text-primary"
              >
                {item.icon && <span className="mr-1">{item.icon}</span>}
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            className="relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-ff-orange text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
              2
            </span>
          </Button>
          
          <Button asChild variant="ghost" size="icon">
            <Link to="/profile">
              <User className="h-5 w-5" />
            </Link>
          </Button>

          <Button asChild className="hidden md:inline-flex btn-gradient">
            <Link to="/login">Sign In</Link>
          </Button>

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
                <Button asChild className="mx-7 mt-4 btn-gradient">
                  <Link to="/login" onClick={() => setIsOpen(false)}>Sign In</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
