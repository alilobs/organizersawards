import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Category } from "@/data/mockData";

interface CategoryProgressProps {
  categories: Category[];
  currentCategoryIndex: number;
  completedCategories: string[];
  onCategoryClick?: (index: number) => void;
}

const CategoryProgress = ({ 
  categories, 
  currentCategoryIndex, 
  completedCategories,
  onCategoryClick 
}: CategoryProgressProps) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Mobile View - Dots */}
      <div className="flex md:hidden items-center justify-center gap-2">
        {categories.map((category, index) => {
          const isCompleted = completedCategories.includes(category.id);
          const isCurrent = index === currentCategoryIndex;
          
          return (
            <button
              key={category.id}
              onClick={() => onCategoryClick?.(index)}
              className={`progress-dot ${isCurrent ? "active" : ""} ${isCompleted ? "completed" : ""}`}
            />
          );
        })}
      </div>

      {/* Desktop View - Tabs */}
      <div className="hidden md:flex items-center justify-center gap-2 flex-wrap">
        {categories.map((category, index) => {
          const isCompleted = completedCategories.includes(category.id);
          const isCurrent = index === currentCategoryIndex;
          
          return (
            <motion.button
              key={category.id}
              onClick={() => onCategoryClick?.(index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${isCurrent 
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_-5px_hsl(var(--primary))]" 
                  : isCompleted
                    ? "bg-accent/20 text-accent border border-accent/30"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                }
              `}
            >
              <span className="flex items-center gap-2">
                {isCompleted && <Check className="w-3.5 h-3.5" />}
                {category.shortName}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="relative h-1 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent rounded-full"
          initial={{ width: "0%" }}
          animate={{ 
            width: `${((completedCategories.length) / categories.length) * 100}%` 
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Category Counter */}
      <div className="text-center text-sm text-muted-foreground">
        <span className="text-foreground font-medium">{completedCategories.length}</span>
        <span> of </span>
        <span className="text-foreground font-medium">{categories.length}</span>
        <span> categories completed</span>
      </div>
    </div>
  );
};

export default CategoryProgress;
