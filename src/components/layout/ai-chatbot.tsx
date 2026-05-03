"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, Bot, User, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import aiService from "@/services/ai.service";
import { cn } from "@/lib/utils";
import { MdOutlineWavingHand } from "react-icons/md";


interface Message {
  id: string;
  text: string;
  display?: React.ReactNode;
  sender: "user" | "bot";
  timestamp: Date;
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Trigger welcome sequence when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const triggerWelcome = async () => {
        await new Promise(resolve => setTimeout(resolve, 600));
        setIsTyping(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const welcomeMessage: Message = {
          id: "welcome",
          text: "Hi! I'm your SkillBridge assistant. How can I help you today?",
          display: (
            <span className="flex items-center gap-2">
              <MdOutlineWavingHand className="h-5 w-5 text-yellow-500 animate-bounce" />
              Hi! I'm your SkillBridge assistant. How can I help you today?
            </span>
          ),
          sender: "bot",
          timestamp: new Date()
        };
        
        setMessages([welcomeMessage]);
        setIsTyping(false);
        
        // Show input slightly after
        setTimeout(() => setShowInput(true), 400);
      };
      
      triggerWelcome();
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(async () => {
      const formattedHistory = messages.map(msg => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text
      }));

      const response = await aiService.getChatResponse(input, formattedHistory);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.div 
        className="fixed bottom-6 right-6 z-[60]"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button 
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "h-14 w-14 rounded-full shadow-2xl transition-all duration-500 overflow-hidden border-2 border-white/20",
            isOpen ? "bg-red-500 hover:bg-red-600 rotate-90" : "bg-primary hover:bg-primary/90"
          )}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
          <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity" />
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-6 bg-background/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={cn(
                "w-full max-w-3xl bg-card border border-border shadow-2xl rounded-[2rem] overflow-hidden flex flex-col h-[85vh] md:h-[750px] relative",
                isMinimized && "h-[80px] md:h-[80px] self-end"
              )}
            >
              {/* Header */}
              <div className="p-5 bg-primary text-primary-foreground flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-inner">
                     <Bot className="h-7 w-7 text-white" />
                  </div>
                  <div>
                     <h3 className="font-extrabold text-lg tracking-tight">SkillBridge AI</h3>
                     <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                        <span className="text-[11px] font-bold uppercase tracking-widest opacity-90">Systems Active</span>
                     </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-10 w-10 rounded-xl hover:bg-white/10 text-white transition-colors"
                      onClick={() => setIsMinimized(!isMinimized)}
                  >
                      <Minimize2 className="h-5 w-5" />
                  </Button>
                  <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-10 w-10 rounded-xl hover:bg-white/10 text-white transition-colors"
                      onClick={() => setIsOpen(false)}
                  >
                      <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {!isMinimized && (
                <>
                  {/* Messages Area */}
                  <div 
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth bg-muted/5 select-text"
                  >
                    {messages.map((msg) => (
                      <motion.div 
                        key={msg.id}
                        initial={{ opacity: 0, x: msg.sender === "user" ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={cn(
                          "flex w-full group",
                          msg.sender === "user" ? "justify-end" : "justify-start"
                        )}
                      >
                        <div className={cn(
                          "flex flex-col gap-2 max-w-[85%] md:max-w-[75%]",
                          msg.sender === "user" ? "items-end" : "items-start"
                        )}>
                          <div className="flex items-center gap-2 px-1 opacity-40 text-[10px] font-black uppercase tracking-[0.15em]">
                             {msg.sender === "user" ? "Client" : "Assistant"}
                             {msg.sender === "bot" && <Sparkles className="h-3 w-3" />}
                          </div>
                          
                          <div className={cn(
                            "p-4 md:p-5 rounded-[1.5rem] text-[15px] leading-relaxed shadow-sm transition-all duration-300",
                            msg.sender === "user" 
                              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/10 rounded-tr-none" 
                              : "bg-background border border-border/60 text-foreground/90 rounded-tl-none hover:border-primary/20"
                          )}>
                            {msg.display || msg.text}
                          </div>
                          
                          <div className="px-2 text-[9px] font-medium opacity-0 group-hover:opacity-30 transition-opacity uppercase tracking-tighter">
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {isTyping && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex justify-start items-center gap-3"
                      >
                        <div className="bg-background border border-border p-4 rounded-2xl rounded-tl-none shadow-sm flex gap-1.5">
                           <div className="h-2 w-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                           <div className="h-2 w-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                           <div className="h-2 w-2 bg-primary/40 rounded-full animate-bounce" />
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest animate-pulse">Thinking...</span>
                      </motion.div>
                    )}
                  </div>

                  {/* Input Interface */}
                  <AnimatePresence>
                    {showInput && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 bg-background border-t border-border shadow-[0_-8px_30px_rgb(0,0,0,0.02)]"
                      >
                        <form onSubmit={handleSend} className="relative flex flex-col gap-3">
                          <div className="relative flex items-center group">
                            <Input 
                              value={input}
                              onChange={(e) => setInput(e.target.value)}
                              placeholder="Type your message here..."
                              className="pr-14 h-14 rounded-2xl bg-muted/30 border-2 border-transparent focus-visible:border-primary/30 focus-visible:ring-0 transition-all text-base shadow-inner group-hover:bg-muted/50"
                            />
                            <Button 
                              type="submit" 
                              disabled={!input.trim() || isTyping}
                              className="absolute right-2 h-10 w-10 rounded-xl p-0 bg-primary text-white shadow-xl shadow-primary/20 hover:shadow-primary/30 active:scale-95 transition-all disabled:opacity-30"
                            >
                              <Send className="h-5 w-5" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between px-2">
                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-40">
                               Enterprise AI Grade
                            </p>
                            <div className="flex gap-2">
                               <div className="h-1 w-8 rounded-full bg-primary/10" />
                               <div className="h-1 w-4 rounded-full bg-primary/5" />
                            </div>
                          </div>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
