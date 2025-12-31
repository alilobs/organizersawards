import { motion } from "framer-motion";
import { LogIn, Vote, Trophy, Gift } from "lucide-react";

const steps = [
  {
    icon: LogIn,
    title: "Login with Discord",
    description: "Connect your Discord account to verify your identity. Accounts must be 30+ days old.",
    color: "text-[#5865F2]",
    bgColor: "bg-[#5865F2]/10",
    borderColor: "border-[#5865F2]/20",
  },
  {
    icon: Vote,
    title: "Cast Your Votes",
    description: "Vote for your favorite organizers across 6 categories. One vote per category.",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
  },
  {
    icon: Trophy,
    title: "Shape the Awards",
    description: "Your votes determine the winners. Results revealed after voting ends.",
    color: "text-cyan",
    bgColor: "bg-cyan/10",
    borderColor: "border-cyan/20",
  },
  {
    icon: Gift,
    title: "Support & Win",
    description: "Optional donations increase the prize pool. Winners receive cash prizes!",
    color: "text-purple",
    bgColor: "bg-purple/10",
    borderColor: "border-purple/20",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-surface">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            How It <span className="text-gradient-gold">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Participating in the Best Organizer Awards is simple. 
            Follow these steps to make your voice heard.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-white/10 to-transparent z-0" />
              )}

              <div className={`
                relative p-6 rounded-2xl border ${step.borderColor} ${step.bgColor}
                transition-all duration-300 hover:-translate-y-1
                hover:shadow-lg hover:shadow-black/20
              `}>
                {/* Step Number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-secondary border border-white/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-muted-foreground">{index + 1}</span>
                </div>

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${step.bgColor} flex items-center justify-center mb-4`}>
                  <step.icon className={`w-6 h-6 ${step.color}`} />
                </div>

                {/* Content */}
                <h3 className="font-display text-lg font-bold mb-2 text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
