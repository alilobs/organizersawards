import { motion } from "framer-motion";
import { Check, ExternalLink, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Organizer } from "@/data/mockData";

interface OrganizerCardProps {
  organizer: Organizer;
  isSelected?: boolean;
  onVote?: (organizerId: string) => void;
  disabled?: boolean;
  index?: number;
}

const OrganizerCard = ({ 
  organizer, 
  isSelected = false, 
  onVote, 
  disabled = false,
  index = 0 
}: OrganizerCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`organizer-card group ${
        isSelected ? "border-primary/50 ring-2 ring-primary/20" : ""
      }`}
    >
      {/* Selected Badge */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center"
        >
          <Check className="w-5 h-5 text-primary-foreground" />
        </motion.div>
      )}

      {/* Logo */}
      <div className="relative w-20 h-20 mb-4 rounded-xl overflow-hidden bg-surface-elevated">
        <img
          src={organizer.logo}
          alt={organizer.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Info */}
      <div className="flex-1 space-y-2">
        <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
          {organizer.name}
        </h3>
        
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3" />
          <span className="uppercase tracking-wider">{organizer.region}</span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {organizer.description}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-4 flex items-center gap-2">
        <Button
          variant={isSelected ? "gold" : "glass"}
          className="flex-1"
          onClick={() => onVote?.(organizer.id)}
          disabled={disabled}
        >
          {isSelected ? (
            <>
              <Check className="w-4 h-4" />
              Voted
            </>
          ) : (
            "Vote"
          )}
        </Button>
        {organizer.website && (
          <Button variant="ghost" size="icon" asChild>
            <a href={organizer.website} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        )}
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-cyan/5" />
      </div>
    </motion.div>
  );
};

export default OrganizerCard;
