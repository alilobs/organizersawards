import { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import DonationModal from "./DonationModal";

const PrizePool = () => {
  const [isDonationOpen, setIsDonationOpen] = useState(false);
  const [totalDonations, setTotalDonations] = useState(0);
  const [recentDonations, setRecentDonations] = useState<Array<{ amount: number; message: string }>>([]);

  const handleDonate = (amount: number, message: string) => {
    setTotalDonations(prev => prev + amount);
    if (message) {
      setRecentDonations(prev => [{ amount, message }, ...prev.slice(0, 2)]);
    }
  };

  const currentPrize = 20 + totalDonations;

  return (
    <section id="prizes" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Growing Prize Pool</span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Support the{" "}
              <span className="text-gradient-gold">Community</span>
            </h2>

            <p className="text-muted-foreground text-lg">
              Our prize pool starts at <strong className="text-foreground">$20</strong> and grows 
              with every donation. If support is strong, prizes can expand to 
              the <strong className="text-foreground">Top 3 winners</strong>!
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-elevated border border-white/5">
                <div className="p-2 rounded-lg bg-primary/10">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Transparent Distribution</h4>
                  <p className="text-sm text-muted-foreground">
                    100% of donations go directly to the prize pool.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-elevated border border-white/5">
                <div className="p-2 rounded-lg bg-cyan/10">
                  <Heart className="w-5 h-5 text-cyan" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Community Powered</h4>
                  <p className="text-sm text-muted-foreground">
                    Every contribution helps recognize excellence in esports.
                  </p>
                </div>
              </div>
            </div>

            <Button 
              variant="gold" 
              size="lg" 
              className="mt-6" 
              onClick={() => setIsDonationOpen(true)}
            >
              <Heart className="w-5 h-5" />
              Donate Now
            </Button>

            {/* Recent Donations */}
            {recentDonations.length > 0 && (
              <div className="mt-6 space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">Recent Supporters:</h4>
                {recentDonations.map((donation, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-3 rounded-lg bg-white/5 border border-white/10"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Heart className="w-3 h-3 text-primary" />
                      <span className="text-sm font-medium text-primary">${donation.amount}</span>
                    </div>
                    <p className="text-sm text-muted-foreground italic">"{donation.message}"</p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right - Prize Display */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-radial from-primary/20 to-transparent blur-3xl" />
            
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-surface-elevated to-surface border border-white/10">
              {/* Current Pool */}
              <div className="text-center mb-8">
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                  Current Prize Pool
                </p>
                <div className="font-display text-6xl md:text-7xl font-black text-gradient-gold">
                  ${currentPrize}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  +${totalDonations} from donations
                </p>
              </div>

              {/* Prize Breakdown */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <span className="font-bold text-primary-foreground">1</span>
                    </div>
                    <span className="font-semibold">1st Place</span>
                  </div>
                  <span className="font-display font-bold text-primary">${currentPrize}</span>
                </div>

                <div className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  totalDonations >= 30 
                    ? "bg-primary/10 border-primary/20" 
                    : "bg-white/5 border-white/10 opacity-50"
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      totalDonations >= 30 ? "bg-primary" : "bg-muted"
                    }`}>
                      <span className={`font-bold ${totalDonations >= 30 ? "text-primary-foreground" : "text-muted-foreground"}`}>2</span>
                    </div>
                    <span className={`font-semibold ${totalDonations >= 30 ? "" : "text-muted-foreground"}`}>2nd Place</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {totalDonations >= 30 ? "$15" : "Unlocks at $30 donations"}
                  </span>
                </div>

                <div className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  totalDonations >= 60 
                    ? "bg-primary/10 border-primary/20" 
                    : "bg-white/5 border-white/10 opacity-50"
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      totalDonations >= 60 ? "bg-primary" : "bg-muted"
                    }`}>
                      <span className={`font-bold ${totalDonations >= 60 ? "text-primary-foreground" : "text-muted-foreground"}`}>3</span>
                    </div>
                    <span className={`font-semibold ${totalDonations >= 60 ? "" : "text-muted-foreground"}`}>3rd Place</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {totalDonations >= 60 ? "$10" : "Unlocks at $60 donations"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Donation Modal */}
      <DonationModal
        isOpen={isDonationOpen}
        onClose={() => setIsDonationOpen(false)}
        onDonate={handleDonate}
      />
    </section>
  );
};

export default PrizePool;
