import { motion } from "framer-motion";
import { Trophy, Menu, X, LogIn, User, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
  isLoggedIn?: boolean;
  onLogin?: () => void;
  onLogout?: () => void;
  isAdmin?: boolean;
}

const Header = ({ isLoggedIn = false, onLogin, onLogout, isAdmin = false }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/5"
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" />
      
      <div className="relative container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/30 transition-colors" />
              <Trophy className="relative w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold tracking-wider">
                <span className="text-gradient-gold">BEST ORGANIZER</span>
              </h1>
              <p className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase">
                Awards 2025
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Home
            </Link>
            <Link 
              to="/vote" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === "/vote" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Vote
            </Link>
            {isAdmin && (
              <Link 
                to="/admin" 
                className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                  location.pathname === "/admin" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Shield className="w-4 h-4" />
                Admin
              </Link>
            )}
          </nav>

          {/* Auth Button */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">User#1234</span>
                </div>
                <Button variant="ghost" size="sm" onClick={onLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button variant="discord" onClick={onLogin}>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                Login with Discord
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4"
          >
            <nav className="flex flex-col gap-4">
              <Link to="/" className="text-foreground font-medium" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link to="/vote" className="text-foreground font-medium" onClick={() => setMobileMenuOpen(false)}>
                Vote
              </Link>
              {isAdmin && (
                <Link to="/admin" className="text-foreground font-medium flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                  <Shield className="w-4 h-4" />
                  Admin Panel
                </Link>
              )}
              <div className="pt-2 border-t border-white/10">
                {isLoggedIn ? (
                  <Button variant="ghost" className="w-full justify-start" onClick={onLogout}>
                    Logout
                  </Button>
                ) : (
                  <Button variant="discord" className="w-full" onClick={onLogin}>
                    <LogIn className="w-4 h-4" />
                    Login with Discord
                  </Button>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
