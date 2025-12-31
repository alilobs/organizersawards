import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Trophy, AlertCircle, CheckCircle } from "lucide-react";
import OrganizerCard from "@/components/OrganizerCard";
import CategoryProgress from "@/components/CategoryProgress";
import SearchFilter from "@/components/SearchFilter";
import { Button } from "@/components/ui/button";
import { categories, getOrganizersByRegion } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

interface VotingSectionProps {
  isLoggedIn: boolean;
  onLogin: () => void;
}

const VotingSection = ({ isLoggedIn, onLogin }: VotingSectionProps) => {
  const { toast } = useToast();
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [votes, setVotes] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");

  const currentCategory = categories[currentCategoryIndex];
  const organizers = getOrganizersByRegion(currentCategory.id);

  const regions = useMemo(() => {
    const allOrgs = getOrganizersByRegion("all");
    return [...new Set(allOrgs.map(org => org.region))];
  }, []);

  const filteredOrganizers = useMemo(() => {
    return organizers.filter(org => {
      const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           org.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = selectedRegion === "all" || org.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
  }, [organizers, searchTerm, selectedRegion]);

  const completedCategories = Object.keys(votes);

  const handleVote = (organizerId: string) => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please login with Discord to vote.",
        variant: "destructive",
      });
      return;
    }

    setVotes(prev => ({
      ...prev,
      [currentCategory.id]: organizerId,
    }));

    toast({
      title: "Vote Recorded!",
      description: `Your vote for ${currentCategory.name} has been saved.`,
    });
  };

  const handleNext = () => {
    if (currentCategoryIndex < categories.length - 1) {
      setCurrentCategoryIndex(prev => prev + 1);
      setSearchTerm("");
      setSelectedRegion("all");
    }
  };

  const handlePrevious = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(prev => prev - 1);
      setSearchTerm("");
      setSelectedRegion("all");
    }
  };

  return (
    <section id="vote-section" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Category Header */}
        <motion.div
          key={currentCategory.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          {currentCategory.isMain && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Trophy className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Main Category</span>
            </div>
          )}
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
            {currentCategory.name}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {currentCategory.description}
          </p>
        </motion.div>

        {/* Progress */}
        <div className="mb-8">
          <CategoryProgress
            categories={categories}
            currentCategoryIndex={currentCategoryIndex}
            completedCategories={completedCategories}
            onCategoryClick={setCurrentCategoryIndex}
          />
        </div>

        {/* Login Notice */}
        {!isLoggedIn && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-xl bg-[#5865F2]/10 border border-[#5865F2]/20 flex items-center gap-4"
          >
            <AlertCircle className="w-5 h-5 text-[#5865F2] shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-foreground font-medium">Login Required</p>
              <p className="text-xs text-muted-foreground">
                Connect your Discord account to vote. Accounts must be 30+ days old.
              </p>
            </div>
            <Button variant="discord" size="sm" onClick={onLogin}>
              Login
            </Button>
          </motion.div>
        )}

        {/* Search & Filter */}
        <div className="mb-8">
          <SearchFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedRegion={selectedRegion}
            onRegionChange={setSelectedRegion}
            regions={regions}
          />
        </div>

        {/* Organizers Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategory.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            {filteredOrganizers.map((organizer, index) => (
              <OrganizerCard
                key={organizer.id}
                organizer={organizer}
                isSelected={votes[currentCategory.id] === organizer.id}
                onVote={handleVote}
                disabled={!isLoggedIn}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredOrganizers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No organizers found matching your criteria.</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-white/10">
          <Button
            variant="glass"
            onClick={handlePrevious}
            disabled={currentCategoryIndex === 0}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="text-sm text-muted-foreground">
            {currentCategoryIndex + 1} / {categories.length}
          </div>

          {currentCategoryIndex === categories.length - 1 ? (
            <Button
              variant="gold"
              onClick={() => {
                toast({
                  title: "Thank you for voting!",
                  description: `You voted in ${completedCategories.length} categories.`,
                });
              }}
              disabled={completedCategories.length === 0}
            >
              <CheckCircle className="w-4 h-4" />
              Finish
            </Button>
          ) : (
            <Button variant="gold" onClick={handleNext}>
              {votes[currentCategory.id] ? "Next" : "Skip"}
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default VotingSection;
