import { motion } from "framer-motion";
import { Trophy, Heart, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative border-t border-white/5 bg-surface">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-primary" />
              <span className="font-display text-lg font-bold text-gradient-gold">
                Best Organizer Awards 2025
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Celebrating excellence in esports tournament organization. 
              Vote for your favorite organizers and help shape the future of competitive gaming.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2">
              <a href="/vote" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Vote Now
              </a>
              <a href="#prizes" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Prize Pool
              </a>
              <a href="#support" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Support the Event
              </a>
            </nav>
          </div>

          {/* Prize Pool */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
              Prize Pool
            </h4>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-display font-bold text-gradient-gold">$20+</span>
              <span className="text-sm text-muted-foreground">Minimum Prize</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Prize pool grows with community donations!
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span>Organized with</span>
            <Heart className="w-4 h-4 text-destructive fill-destructive" />
            <span>by</span>
            <a 
              href="https://twitter.com/zytrix" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              Zytrix <ExternalLink className="w-3 h-3" />
            </a>
            <span>&</span>
            <a 
              href="https://twitter.com/arabstar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              Arab Star <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <p className="text-xs">
            © 2025 Best Organizer Awards. All rights reserved.
          </p>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </footer>
  );
};

export default Footer;
