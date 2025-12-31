import { useState } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, Users, Trophy, Settings, Lock, Unlock, 
  Plus, Edit, Trash2, Download, BarChart3, Eye, EyeOff,
  Save, X
} from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories, organizers, Organizer } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [votingLocked, setVotingLocked] = useState(false);
  const [resultsPublic, setResultsPublic] = useState(false);

  // Mock admin data
  const mockVoteCounts: Record<string, Record<string, number>> = {
    "best-organizer-2025": {
      "esl": 245,
      "blast": 189,
      "pgl": 156,
      "riot": 312,
    },
    "best-emea": {
      "esl": 145,
      "blast": 167,
      "pgl": 123,
    },
  };

  const totalVotes = Object.values(mockVoteCounts).reduce(
    (acc, category) => acc + Object.values(category).reduce((a, b) => a + b, 0),
    0
  );

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "organizers", label: "Organizers", icon: Users },
    { id: "categories", label: "Categories", icon: Trophy },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleToggleVoting = () => {
    setVotingLocked(!votingLocked);
    toast({
      title: votingLocked ? "Voting Unlocked" : "Voting Locked",
      description: votingLocked 
        ? "Users can now vote again." 
        : "Voting has been disabled.",
    });
  };

  const handlePublishResults = () => {
    setResultsPublic(!resultsPublic);
    toast({
      title: resultsPublic ? "Results Hidden" : "Results Published",
      description: resultsPublic 
        ? "Results are now hidden from public view." 
        : "Final results are now visible to everyone!",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn isAdmin />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Admin Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold mb-2">Admin Panel</h1>
            <p className="text-muted-foreground">Manage the Best Organizer Awards 2025</p>
          </div>

          <div className="grid lg:grid-cols-[240px_1fr] gap-6">
            {/* Sidebar */}
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* Content */}
            <div className="space-y-6">
              {activeTab === "dashboard" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="stat-card">
                      <p className="text-sm text-muted-foreground mb-1">Total Votes</p>
                      <p className="font-display text-3xl font-bold text-gradient-gold">{totalVotes}</p>
                    </div>
                    <div className="stat-card">
                      <p className="text-sm text-muted-foreground mb-1">Unique Voters</p>
                      <p className="font-display text-3xl font-bold text-cyan">847</p>
                    </div>
                    <div className="stat-card">
                      <p className="text-sm text-muted-foreground mb-1">Prize Pool</p>
                      <p className="font-display text-3xl font-bold text-foreground">$45</p>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 rounded-xl bg-surface-elevated border border-white/5">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold">Voting Status</h3>
                          <p className="text-sm text-muted-foreground">
                            {votingLocked ? "Voting is currently disabled" : "Voting is open"}
                          </p>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${votingLocked ? "bg-destructive" : "bg-green-500"}`} />
                      </div>
                      <Button
                        variant={votingLocked ? "gold" : "destructive"}
                        className="w-full"
                        onClick={handleToggleVoting}
                      >
                        {votingLocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                        {votingLocked ? "Unlock Voting" : "Lock Voting"}
                      </Button>
                    </div>

                    <div className="p-6 rounded-xl bg-surface-elevated border border-white/5">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold">Results Visibility</h3>
                          <p className="text-sm text-muted-foreground">
                            {resultsPublic ? "Results are public" : "Results are hidden"}
                          </p>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${resultsPublic ? "bg-green-500" : "bg-muted"}`} />
                      </div>
                      <Button
                        variant={resultsPublic ? "glass" : "gold"}
                        className="w-full"
                        onClick={handlePublishResults}
                      >
                        {resultsPublic ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        {resultsPublic ? "Hide Results" : "Publish Results"}
                      </Button>
                    </div>
                  </div>

                  {/* Vote Distribution */}
                  <div className="p-6 rounded-xl bg-surface-elevated border border-white/5">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-semibold flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-primary" />
                        Vote Distribution - Best Organizer 2025
                      </h3>
                      <Button variant="glass" size="sm">
                        <Download className="w-4 h-4" />
                        Export
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {Object.entries(mockVoteCounts["best-organizer-2025"] || {}).map(([orgId, count]) => {
                        const org = organizers.find(o => o.id === orgId);
                        const maxVotes = Math.max(...Object.values(mockVoteCounts["best-organizer-2025"] || {}));
                        const percentage = (count / maxVotes) * 100;
                        
                        return (
                          <div key={orgId} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">{org?.name || orgId}</span>
                              <span className="text-muted-foreground">{count} votes</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="h-full bg-gradient-to-r from-primary to-cyan rounded-full"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "organizers" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="font-display text-xl font-bold">Manage Organizers</h2>
                    <Button variant="gold">
                      <Plus className="w-4 h-4" />
                      Add Organizer
                    </Button>
                  </div>

                  <div className="rounded-xl border border-white/10 overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-surface-elevated">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Organizer</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Region</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Votes</th>
                          <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {organizers.slice(0, 5).map((org) => (
                          <tr key={org.id} className="hover:bg-white/2">
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={org.logo}
                                  alt={org.name}
                                  className="w-10 h-10 rounded-lg object-cover"
                                />
                                <div>
                                  <p className="font-medium">{org.name}</p>
                                  <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                                    {org.description}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <span className="px-2 py-1 rounded-full text-xs bg-secondary">
                                {org.region}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-muted-foreground">
                              {Math.floor(Math.random() * 300)}
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-destructive">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === "categories" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="font-display text-xl font-bold">Manage Categories</h2>
                  </div>

                  <div className="grid gap-4">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className="p-4 rounded-xl bg-surface-elevated border border-white/5 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-4">
                          {category.isMain && (
                            <Trophy className="w-5 h-5 text-primary" />
                          )}
                          <div>
                            <p className="font-medium">{category.name}</p>
                            <p className="text-sm text-muted-foreground">{category.description}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "settings" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h2 className="font-display text-xl font-bold">Event Settings</h2>

                  <div className="max-w-xl space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Event Name</label>
                      <Input 
                        defaultValue="Best Organizer Awards 2025"
                        className="bg-surface-elevated border-white/10"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Minimum Account Age (Days)</label>
                      <Input 
                        type="number"
                        defaultValue="30"
                        className="bg-surface-elevated border-white/10"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Prize Pool ($)</label>
                      <Input 
                        type="number"
                        defaultValue="20"
                        className="bg-surface-elevated border-white/10"
                      />
                    </div>

                    <Button variant="gold">
                      <Save className="w-4 h-4" />
                      Save Settings
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
