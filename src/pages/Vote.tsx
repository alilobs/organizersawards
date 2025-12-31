import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VotingSection from "@/components/VotingSection";
import { useToast } from "@/hooks/use-toast";

const Vote = () => {
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
      
      <main className="pt-20">
        <VotingSection isLoggedIn={isLoggedIn} onLogin={handleLogin} />
      </main>

      <Footer />
    </div>
  );
};

export default Vote;
