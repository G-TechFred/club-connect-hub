import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Trophy, Users, MessageCircle, Newspaper } from "lucide-react";

export const Route = createFileRoute("/welcome")({
  head: () => ({
    meta: [
      { title: "Welcome — G-TECH FRED" },
      { name: "description", content: "Welcome to the ultimate football community platform." },
    ],
  }),
  component: WelcomePage,
});

function WelcomePage() {
  const navigate = useNavigate();

  const features = [
    { icon: Trophy, label: "Support Your Club", desc: "Choose & follow your team" },
    { icon: MessageCircle, label: "Live Chat", desc: "Chat with fellow fans" },
    { icon: Newspaper, label: "Live News", desc: "Real-time club updates" },
    { icon: Users, label: "Community", desc: "Connect with fans worldwide" },
  ];

  return (
    <div className="phone-frame flex flex-col min-h-screen bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-transparent to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-primary/8 blur-[120px]" />

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        {/* Logo */}
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-xl mb-6 animate-scale-in">
          <svg className="w-12 h-12 text-primary-foreground" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </div>

        <h1 className="text-3xl font-black text-gradient-primary mb-2">G-TECH FRED</h1>
        <p className="text-muted-foreground text-center text-sm mb-10 max-w-[260px]">
          The ultimate community platform for football fans around the world
        </p>

        {/* Feature cards */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm mb-10">
          {features.map((f, i) => (
            <div
              key={f.label}
              className="glass-card rounded-2xl p-4 flex flex-col items-center text-center gap-2 animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs font-semibold text-foreground">{f.label}</span>
              <span className="text-[10px] text-muted-foreground leading-tight">{f.desc}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="w-full max-w-sm space-y-3">
          <Button
            onClick={() => navigate({ to: "/login" })}
            className="w-full h-12 rounded-xl text-base"
            variant="hero"
          >
            Get Started
          </Button>
          <Button
            onClick={() => navigate({ to: "/login" })}
            variant="glass"
            className="w-full h-12 rounded-xl text-base"
          >
            I already have an account
          </Button>
        </div>
      </div>

      {/* Bottom dots */}
      <div className="flex justify-center gap-2 pb-6">
        <div className="w-2 h-2 rounded-full bg-muted" />
        <div className="w-2 h-2 rounded-full bg-primary" />
        <div className="w-2 h-2 rounded-full bg-muted" />
      </div>
    </div>
  );
}
