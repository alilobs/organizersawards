import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import PrizePool from "@/components/PrizePool";
import VotingSection from "@/components/VotingSection";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    toast({
      title: "Welcome!",
      description: "You're now logged in with Discord.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isLoggedIn={isLoggedIn} 
        onLogin={handleLogin} 
        onLogout={() => setIsLoggedIn(false)} 
      />
      <main>
        <HeroSection />
        <VotingSection isLoggedIn={isLoggedIn} onLogin={handleLogin} />
        <HowItWorks />
        <PrizePool />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
