import React from "react";
import { Link } from "react-router-dom";
import { NotificationBell } from "./NotificationBell";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-semibold">FeedForward</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link to="/" className="text-sm font-medium hover:underline underline-offset-4">
                Home
              </Link>
              <Link to="/map" className="text-sm font-medium hover:underline underline-offset-4">
                Find Food
              </Link>
              <Link to="/donate" className="text-sm font-medium hover:underline underline-offset-4">
                Donate
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <NotificationBell />
            {/* Other user menu elements would go here */}
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t py-6 md:py-0">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:h-16">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} FeedForward. All rights reserved.
            </p>
            <nav className="flex gap-4">
              <Link to="/about" className="text-sm text-muted-foreground hover:underline underline-offset-4">
                About
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:underline underline-offset-4">
                Contact
              </Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:underline underline-offset-4">
                Privacy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
