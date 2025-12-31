import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, DollarSign, MessageSquare, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDonate: (amount: number, message: string) => void;
}

const DonationModal = ({ isOpen, onClose, onDonate }: DonationModalProps) => {
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const presetAmounts = [5, 10, 20, 50];

  const handleSubmit = async () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid donation amount.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onDonate(numAmount, message);
    toast({
      title: "Thank you! 💖",
      description: `Your $${numAmount} donation has been received!`,
    });
    
    setAmount("");
    setMessage("");
    setIsSubmitting(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-card border border-white/10 rounded-2xl p-6 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold">Support the Prize Pool</h3>
                    <p className="text-sm text-muted-foreground">100% goes to winners</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Preset Amounts */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {presetAmounts.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setAmount(preset.toString())}
                    className={`p-3 rounded-xl border transition-all ${
                      amount === preset.toString()
                        ? "bg-primary/20 border-primary text-primary"
                        : "bg-white/5 border-white/10 text-foreground hover:border-white/20"
                    }`}
                  >
                    <span className="font-semibold">${preset}</span>
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="relative mb-4">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="number"
                  placeholder="Custom amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-10 bg-surface-elevated border-white/10"
                />
              </div>

              {/* Message */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Leave a message (optional)</span>
                </div>
                <Textarea
                  placeholder="Good luck to all organizers!"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-surface-elevated border-white/10 resize-none"
                  rows={3}
                />
              </div>

              {/* Submit Button */}
              <Button
                variant="gold"
                size="lg"
                className="w-full"
                onClick={handleSubmit}
                disabled={isSubmitting || !amount}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                    />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Donate {amount ? `$${amount}` : ""}
                  </>
                )}
              </Button>

              {/* Test Mode Notice */}
              <p className="text-xs text-muted-foreground text-center mt-4">
                🧪 Test mode - No real payment will be processed
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DonationModal;
