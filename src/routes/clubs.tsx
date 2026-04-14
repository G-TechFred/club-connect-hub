import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Search, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const Route = createFileRoute("/clubs")({
  head: () => ({
    meta: [
      { title: "Select Your Club — G-TECH FRED" },
      { name: "description", content: "Choose your favourite football club to join the community chat." },
    ],
  }),
  component: ClubsPage,
});

const clubs = [
  { id: "man-utd", name: "Manchester United", league: "Premier League", emoji: "🔴", color: "from-red-600 to-red-800", members: "12.4K" },
  { id: "real-madrid", name: "Real Madrid", league: "La Liga", emoji: "⚪", color: "from-white/20 to-white/5", members: "15.2K" },
  { id: "barcelona", name: "FC Barcelona", league: "La Liga", emoji: "🔵", color: "from-blue-700 to-red-700", members: "14.1K" },
  { id: "liverpool", name: "Liverpool FC", league: "Premier League", emoji: "🔴", color: "from-red-700 to-red-900", members: "11.8K" },
  { id: "chelsea", name: "Chelsea FC", league: "Premier League", emoji: "🔵", color: "from-blue-700 to-blue-900", members: "10.5K" },
  { id: "man-city", name: "Manchester City", league: "Premier League", emoji: "🩵", color: "from-sky-400 to-sky-600", members: "13.2K" },
  { id: "arsenal", name: "Arsenal FC", league: "Premier League", emoji: "🔴", color: "from-red-600 to-red-800", members: "11.1K" },
  { id: "bayern", name: "Bayern Munich", league: "Bundesliga", emoji: "🔴", color: "from-red-700 to-red-900", members: "9.8K" },
  { id: "psg", name: "Paris Saint-Germain", league: "Ligue 1", emoji: "🔵", color: "from-blue-900 to-red-600", members: "8.9K" },
  { id: "juventus", name: "Juventus FC", league: "Serie A", emoji: "⚪", color: "from-white/15 to-black/30", members: "7.6K" },
  { id: "ac-milan", name: "AC Milan", league: "Serie A", emoji: "🔴", color: "from-red-700 to-black/50", members: "7.2K" },
  { id: "inter-milan", name: "Inter Milan", league: "Serie A", emoji: "🔵", color: "from-blue-800 to-black/50", members: "6.9K" },
  { id: "tottenham", name: "Tottenham Hotspur", league: "Premier League", emoji: "⚪", color: "from-white/15 to-blue-900", members: "8.4K" },
  { id: "dortmund", name: "Borussia Dortmund", league: "Bundesliga", emoji: "🟡", color: "from-yellow-500 to-yellow-700", members: "6.5K" },
  { id: "atletico", name: "Atletico Madrid", league: "La Liga", emoji: "🔴", color: "from-red-600 to-blue-800", members: "5.8K" },
];

function ClubsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = clubs.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.league.toLowerCase().includes(search.toLowerCase())
  );

  const leagues = [...new Set(filtered.map(c => c.league))];

  return (
    <div className="phone-frame flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-20 glass px-4 pt-10 pb-3">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate({ to: "/home" })} className="w-10 h-10 rounded-xl glass flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-foreground">Select Your Club</h1>
            <p className="text-xs text-muted-foreground">Choose a club to join the community</p>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search clubs or leagues..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 pl-10 rounded-xl bg-secondary border-0 text-foreground placeholder:text-muted-foreground text-sm"
          />
        </div>
      </div>

      {/* Club List */}
      <div className="flex-1 overflow-y-auto px-4 pb-8">
        {leagues.map((league) => (
          <div key={league} className="mt-4">
            <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-2 px-1">{league}</p>
            <div className="space-y-2">
              {filtered.filter(c => c.league === league).map((club, i) => (
                <button
                  key={club.id}
                  onClick={() => navigate({ to: "/chat/$clubId", params: { clubId: club.id } })}
                  className="w-full glass-card rounded-2xl p-4 flex items-center gap-3 hover:bg-accent/30 transition-all duration-200 animate-fade-up"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${club.color} flex items-center justify-center text-2xl shadow-lg`}>
                    {club.emoji}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-foreground">{club.name}</p>
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                      <Users className="w-3 h-3" /> {club.members} members
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
                    <span className="text-xs text-primary font-bold">→</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
