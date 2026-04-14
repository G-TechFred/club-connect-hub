import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import {
  Trophy, Newspaper, MessageCircle, Settings, User, Bell,
  Shield, HelpCircle, LogOut, ChevronRight, TrendingUp, Flame, Star,
} from "lucide-react";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Home — G-TECH FRED" },
      { name: "description", content: "Your football community hub." },
    ],
  }),
  component: HomePage,
});

const newsItems = [
  { id: 1, club: "Manchester United", title: "Ten Hag confirms new signing talks", time: "2h ago", hot: true },
  { id: 2, club: "Real Madrid", title: "Bellingham scores hat-trick in training", time: "3h ago", hot: true },
  { id: 3, club: "Barcelona", title: "Lamine Yamal extends contract until 2030", time: "5h ago", hot: false },
  { id: 4, club: "Liverpool", title: "Klopp's successor reveals transfer plans", time: "6h ago", hot: false },
  { id: 5, club: "Chelsea", title: "New stadium plans revealed for 2028", time: "8h ago", hot: false },
];

const trendingClubs = [
  { name: "Man United", emoji: "🔴", members: "12.4K" },
  { name: "Real Madrid", emoji: "⚪", members: "15.2K" },
  { name: "Barcelona", emoji: "🔵", members: "14.1K" },
  { name: "Liverpool", emoji: "🔴", members: "11.8K" },
];

function HomePage() {
  const navigate = useNavigate();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="phone-frame flex flex-col min-h-screen bg-background relative">
      {/* Header */}
      <div className="sticky top-0 z-20 glass px-4 pt-10 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-bold text-sm">
              GF
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">G-TECH FRED</h1>
              <p className="text-xs text-muted-foreground">Welcome back, Fan!</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-xl glass flex items-center justify-center relative">
              <Bell className="w-5 h-5 text-foreground" />
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-destructive" />
            </button>
            <button onClick={() => setSettingsOpen(true)} className="w-10 h-10 rounded-xl glass flex items-center justify-center">
              <Settings className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-24">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <Button
            onClick={() => navigate({ to: "/clubs" })}
            className="h-24 rounded-2xl flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg border-0"
          >
            <Trophy className="w-7 h-7" />
            <span className="text-sm font-semibold">My Club</span>
          </Button>
          <Button
            onClick={() => navigate({ to: "/clubs" })}
            variant="glass"
            className="h-24 rounded-2xl flex flex-col items-center justify-center gap-2 border-0"
          >
            <MessageCircle className="w-7 h-7 text-gold" />
            <span className="text-sm font-semibold text-foreground">Club Chats</span>
          </Button>
        </div>

        {/* Trending Clubs */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" /> Trending Clubs
            </h2>
            <Link to="/clubs" className="text-xs text-primary">See all</Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
            {trendingClubs.map((club) => (
              <button
                key={club.name}
                onClick={() => navigate({ to: "/clubs" })}
                className="flex-shrink-0 glass-card rounded-2xl p-3 w-[120px] flex flex-col items-center gap-2"
              >
                <span className="text-2xl">{club.emoji}</span>
                <span className="text-xs font-semibold text-foreground">{club.name}</span>
                <span className="text-[10px] text-muted-foreground">{club.members} fans</span>
              </button>
            ))}
          </div>
        </div>

        {/* Live News */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Newspaper className="w-4 h-4 text-gold" /> Live News
            </h2>
            <span className="text-xs text-primary flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" /> Live
            </span>
          </div>
          <div className="space-y-3">
            {newsItems.map((item) => (
              <div key={item.id} className="glass-card rounded-2xl p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">⚽</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] text-primary font-semibold uppercase tracking-wider">{item.club}</span>
                    {item.hot && <Flame className="w-3 h-3 text-destructive" />}
                  </div>
                  <p className="text-sm text-foreground font-medium leading-tight">{item.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{item.time}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Community Stats */}
        <div className="mt-6 glass-card rounded-2xl p-4">
          <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-gold" /> Community Stats
          </h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <p className="text-xl font-bold text-gradient-primary">250K+</p>
              <p className="text-[10px] text-muted-foreground">Active Fans</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-gradient-gold">180+</p>
              <p className="text-[10px] text-muted-foreground">Clubs</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-gradient-primary">1.2M</p>
              <p className="text-[10px] text-muted-foreground">Messages/Day</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] glass border-t border-border/50 px-6 py-2 pb-6 z-30">
        <div className="flex justify-around">
          {[
            { icon: Trophy, label: "Home", active: true, to: "/home" as const },
            { icon: MessageCircle, label: "Chats", active: false, to: "/clubs" as const },
            { icon: Newspaper, label: "News", active: false, to: "/home" as const },
            { icon: User, label: "Profile", active: false, to: "/home" as const },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`flex flex-col items-center gap-1 py-1 px-3 ${item.active ? "text-primary" : "text-muted-foreground"}`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Settings Sheet - slides from left */}
      <Sheet open={settingsOpen} onOpenChange={setSettingsOpen}>
        <SheetContent side="left" className="w-[300px] bg-card border-border p-0">
          <SheetHeader className="p-6 pb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-bold text-lg">
                GF
              </div>
              <div>
                <SheetTitle className="text-foreground text-base">Guest User</SheetTitle>
                <SheetDescription className="text-muted-foreground text-xs">guest@gtechfred.com</SheetDescription>
              </div>
            </div>
          </SheetHeader>
          <div className="py-2">
            {[
              { icon: User, label: "My Profile" },
              { icon: Trophy, label: "My Club" },
              { icon: Bell, label: "Notifications" },
              { icon: Shield, label: "Privacy & Security" },
              { icon: HelpCircle, label: "Help & Support" },
            ].map((item) => (
              <button key={item.label} className="w-full flex items-center gap-3 px-6 py-3.5 text-foreground hover:bg-accent/50 transition-colors">
                <item.icon className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium">{item.label}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
              </button>
            ))}
            <div className="border-t border-border my-2" />
            <button
              onClick={() => { setSettingsOpen(false); navigate({ to: "/login" }); }}
              className="w-full flex items-center gap-3 px-6 py-3.5 text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Log Out</span>
            </button>
          </div>
          <div className="absolute bottom-6 left-0 right-0 text-center">
            <p className="text-[10px] text-muted-foreground">G-TECH FRED v1.0</p>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
