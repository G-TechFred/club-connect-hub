import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "G-TECH FRED — Community Sports App" },
      { name: "description", content: "The ultimate community sports platform for football fans worldwide." },
      { property: "og:title", content: "G-TECH FRED — Community Sports App" },
      { property: "og:description", content: "Connect with your club. Chat with fans. Stay updated." },
    ],
  }),
  component: SplashScreen,
});

function SplashScreen() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"logo" | "tagline" | "ready">("logo");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("tagline"), 1200);
    const t2 = setTimeout(() => setPhase("ready"), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="phone-frame flex flex-col items-center justify-center min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-gold/5" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-primary/10 blur-[100px]" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-48 h-48 rounded-full bg-gold/10 blur-[80px]" />

      {/* Logo */}
      <div className={`flex flex-col items-center gap-4 transition-all duration-700 ${phase !== "logo" ? "opacity-100 scale-100" : "opacity-0 scale-90"}`} style={{ animation: "scale-in 0.8s ease-out forwards" }}>
        <div className="relative">
          <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-2xl animate-pulse-glow">
            <svg className="w-16 h-16 text-primary-foreground" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-lg bg-gold flex items-center justify-center text-gold-foreground text-xs font-bold shadow-lg">
            ⚽
          </div>
        </div>

        <h1 className="text-4xl font-black tracking-tight text-gradient-primary mt-4">
          G-TECH FRED
        </h1>
      </div>

      {/* Tagline */}
      <div className={`mt-6 text-center transition-all duration-500 ${phase === "tagline" || phase === "ready" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase">
          Your Club. Your Community.
        </p>
      </div>

      {/* Tap to continue */}
      {phase === "ready" && (
        <button
          onClick={() => navigate({ to: "/welcome" })}
          className="absolute bottom-16 left-0 right-0 flex flex-col items-center gap-2 animate-fade-up cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full border-2 border-primary/40 flex items-center justify-center animate-float">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <span className="text-muted-foreground text-xs tracking-wider uppercase">Tap to continue</span>
        </button>
      )}

      {/* Bottom dots */}
      <div className="absolute bottom-6 flex gap-2">
        <div className="w-2 h-2 rounded-full bg-primary" />
        <div className="w-2 h-2 rounded-full bg-muted" />
        <div className="w-2 h-2 rounded-full bg-muted" />
      </div>
    </div>
  );
}
