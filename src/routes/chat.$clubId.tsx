import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import {
  ArrowLeft, Send, Smile, Paperclip, Mic, Image, MoreVertical,
  Phone, Video, Check, CheckCheck,
} from "lucide-react";

export const Route = createFileRoute("/chat/$clubId")({
  head: ({ params }) => ({
    meta: [
      { title: `${getClubName(params.clubId)} Chat — G-TECH FRED` },
    ],
  }),
  component: ChatPage,
});

function getClubName(id: string) {
  const map: Record<string, string> = {
    "man-utd": "Manchester United",
    "real-madrid": "Real Madrid",
    "barcelona": "FC Barcelona",
    "liverpool": "Liverpool FC",
    "chelsea": "Chelsea FC",
    "man-city": "Manchester City",
    "arsenal": "Arsenal FC",
    "bayern": "Bayern Munich",
    "psg": "Paris Saint-Germain",
    "juventus": "Juventus FC",
    "ac-milan": "AC Milan",
    "inter-milan": "Inter Milan",
    "tottenham": "Tottenham Hotspur",
    "dortmund": "Borussia Dortmund",
    "atletico": "Atletico Madrid",
  };
  return map[id] || "Club Chat";
}

function getClubEmoji(id: string) {
  const map: Record<string, string> = {
    "man-utd": "🔴", "real-madrid": "⚪", "barcelona": "🔵", "liverpool": "🔴",
    "chelsea": "🔵", "man-city": "🩵", "arsenal": "🔴", "bayern": "🔴",
    "psg": "🔵", "juventus": "⚪", "ac-milan": "🔴", "inter-milan": "🔵",
    "tottenham": "⚪", "dortmund": "🟡", "atletico": "🔴",
  };
  return map[id] || "⚽";
}

interface Message {
  id: number;
  text: string;
  sender: string;
  time: string;
  isMe: boolean;
  type: "text" | "image" | "voice";
  status?: "sent" | "delivered" | "read";
  avatar: string;
}

const initialMessages: Message[] = [
  { id: 1, text: "Welcome to the group! 🎉⚽", sender: "Admin", time: "10:00 AM", isMe: false, type: "text", avatar: "A" },
  { id: 2, text: "Who's watching the match tonight?", sender: "Carlos", time: "10:05 AM", isMe: false, type: "text", avatar: "C" },
  { id: 3, text: "I am! Can't wait! 🔥", sender: "You", time: "10:06 AM", isMe: true, type: "text", status: "read", avatar: "Y" },
  { id: 4, text: "The lineup looks strong today. Our midfield is going to dominate!", sender: "Sarah", time: "10:08 AM", isMe: false, type: "text", avatar: "S" },
  { id: 5, text: "Did you all see that transfer rumor? 👀", sender: "Mike", time: "10:12 AM", isMe: false, type: "text", avatar: "M" },
  { id: 6, text: "Yeah! That would be insane if it happens", sender: "You", time: "10:13 AM", isMe: true, type: "text", status: "read", avatar: "Y" },
  { id: 7, text: "GOAAAL! 🥅⚽🎉🎉🎉", sender: "Carlos", time: "10:45 AM", isMe: false, type: "text", avatar: "C" },
  { id: 8, text: "YESSS!! WHAT A STRIKE!! 🚀", sender: "Sarah", time: "10:45 AM", isMe: false, type: "text", avatar: "S" },
];

const emojiList = ["😀", "😂", "🔥", "⚽", "❤️", "👏", "💪", "🎉", "😍", "🤔", "😎", "👍", "🙌", "🥅", "🏆", "⭐", "💯", "😤", "🤩", "🫡"];

function ChatPage() {
  const navigate = useNavigate();
  const { clubId } = Route.useParams();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [showAttach, setShowAttach] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: messages.length + 1,
      text: input,
      sender: "You",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isMe: true,
      type: "text",
      status: "sent",
      avatar: "Y",
    };
    setMessages([...messages, newMsg]);
    setInput("");
    setShowEmoji(false);

    // Simulate status updates
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === newMsg.id ? { ...m, status: "delivered" as const } : m));
    }, 1000);
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === newMsg.id ? { ...m, status: "read" as const } : m));
    }, 2000);
  };

  const clubName = getClubName(clubId);
  const clubEmoji = getClubEmoji(clubId);

  return (
    <div className="phone-frame flex flex-col h-screen bg-background">
      {/* Chat Header */}
      <div className="sticky top-0 z-20 glass px-3 pt-10 pb-2">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate({ to: "/clubs" })} className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-accent/30 transition-colors">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-xl shadow-md">
            {clubEmoji}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-bold text-foreground truncate">{clubName}</h1>
            <p className="text-[10px] text-primary flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              1,234 online
            </p>
          </div>
          <div className="flex gap-1">
            <button className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-accent/30 transition-colors">
              <Video className="w-5 h-5 text-foreground" />
            </button>
            <button className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-accent/30 transition-colors">
              <Phone className="w-5 h-5 text-foreground" />
            </button>
            <button className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-accent/30 transition-colors">
              <MoreVertical className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
        {/* Date separator */}
        <div className="flex justify-center my-2">
          <span className="text-[10px] text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">Today</span>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isMe ? "justify-end" : "justify-start"} animate-fade-up`}>
            {!msg.isMe && (
              <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold text-foreground mr-1.5 flex-shrink-0 mt-auto">
                {msg.avatar}
              </div>
            )}
            <div className={`max-w-[75%] rounded-2xl px-3.5 py-2 ${
              msg.isMe
                ? "bg-chat-sent text-foreground rounded-br-md"
                : "bg-chat-received text-foreground rounded-bl-md"
            }`}>
              {!msg.isMe && (
                <p className="text-[10px] font-semibold text-primary mb-0.5">{msg.sender}</p>
              )}
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <div className={`flex items-center gap-1 mt-0.5 ${msg.isMe ? "justify-end" : ""}`}>
                <span className="text-[9px] text-muted-foreground">{msg.time}</span>
                {msg.isMe && msg.status && (
                  msg.status === "read" ? (
                    <CheckCheck className="w-3 h-3 text-primary" />
                  ) : msg.status === "delivered" ? (
                    <CheckCheck className="w-3 h-3 text-muted-foreground" />
                  ) : (
                    <Check className="w-3 h-3 text-muted-foreground" />
                  )
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Emoji Picker */}
      {showEmoji && (
        <div className="px-3 py-2 glass border-t border-border/50 animate-fade-up">
          <div className="flex flex-wrap gap-2">
            {emojiList.map((emoji) => (
              <button
                key={emoji}
                onClick={() => setInput(input + emoji)}
                className="text-xl hover:scale-125 transition-transform p-1"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Attachment Options */}
      {showAttach && (
        <div className="px-3 py-3 glass border-t border-border/50 animate-fade-up">
          <div className="flex gap-4 justify-center">
            {[
              { icon: Image, label: "Photo", color: "bg-primary/20 text-primary" },
              { icon: Video, label: "Video", color: "bg-gold/20 text-gold" },
              { icon: Paperclip, label: "File", color: "bg-blue-500/20 text-blue-400" },
            ].map((item) => (
              <button key={item.label} className="flex flex-col items-center gap-1.5" onClick={() => setShowAttach(false)}>
                <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] text-muted-foreground">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Bar */}
      <div className="glass border-t border-border/50 px-3 py-2 pb-6">
        <div className="flex items-end gap-2">
          <button
            onClick={() => { setShowEmoji(!showEmoji); setShowAttach(false); }}
            className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${showEmoji ? "bg-primary/20" : "hover:bg-accent/30"}`}
          >
            <Smile className={`w-5 h-5 ${showEmoji ? "text-primary" : "text-muted-foreground"}`} />
          </button>
          <button
            onClick={() => { setShowAttach(!showAttach); setShowEmoji(false); }}
            className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${showAttach ? "bg-primary/20" : "hover:bg-accent/30"}`}
          >
            <Paperclip className={`w-5 h-5 ${showAttach ? "text-primary" : "text-muted-foreground"}`} />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="w-full h-10 px-4 rounded-2xl bg-secondary border-0 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
            />
          </div>
          {input.trim() ? (
            <button
              onClick={sendMessage}
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-lg hover:bg-primary/90 transition-colors"
            >
              <Send className="w-4 h-4 text-primary-foreground" />
            </button>
          ) : (
            <button
              onMouseDown={() => setIsRecording(true)}
              onMouseUp={() => setIsRecording(false)}
              onTouchStart={() => setIsRecording(true)}
              onTouchEnd={() => setIsRecording(false)}
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                isRecording ? "bg-destructive scale-110 animate-pulse" : "bg-primary hover:bg-primary/90"
              }`}
            >
              <Mic className={`w-4 h-4 ${isRecording ? "text-destructive-foreground" : "text-primary-foreground"}`} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
