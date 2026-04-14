import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset Password — G-TECH FRED" },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="phone-frame flex flex-col min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      <div className="relative z-10 flex flex-col min-h-screen px-6">
        <div className="pt-12 pb-4">
          <button onClick={() => navigate({ to: "/login" })} className="w-10 h-10 rounded-xl glass flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {sent ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center animate-scale-in">
            <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Check Your Email</h1>
            <p className="text-muted-foreground text-sm mb-8 max-w-[260px]">
              We've sent a password reset link to <span className="text-foreground font-medium">{email}</span>
            </p>
            <Button onClick={() => navigate({ to: "/login" })} className="w-full max-w-sm h-12 rounded-xl" variant="hero">
              Back to Sign In
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Reset Password</h1>
              <p className="text-muted-foreground text-sm">Enter your email and we'll send you a reset link</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 pl-11 rounded-xl bg-secondary border-0 text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>
              <Button type="submit" className="w-full h-12 rounded-xl text-base" variant="hero">
                Send Reset Link
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
