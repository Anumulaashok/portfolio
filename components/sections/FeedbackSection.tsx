"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ShinyText } from "@/components/reactbits/ShinyText";
import {
  CrackerBurstOverlay,
  createCrackerBursts,
  type CrackerBurst,
} from "@/components/ui/CrackerBurstOverlay";
import { sectionViewport } from "@/lib/viewport";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Sender = "agent" | "user";

interface Message {
  id: string;
  sender: Sender;
  text: string;
  timestamp: string;
}

interface PromptSuggestion {
  id: string;
  label: string;
  category: string;
  promptText: string;
}

const PROMPT_SUGGESTIONS: PromptSuggestion[] = [
  {
    id: "general",
    label: "💡 General Feedback",
    category: "General Feedback",
    promptText: "I'd like to share general feedback about your portfolio.",
  },
  {
    id: "recruiter",
    label: "💼 Recruiter Inquiry",
    category: "Recruiter Inquiry",
    promptText: "I'm a recruiter/hiring manager interested in discussing potential roles.",
  },
  {
    id: "project",
    label: "🚀 Project Collaboration",
    category: "Project Collaboration",
    promptText: "I'd like to collaborate on an AI Agent or web project with you.",
  },
  {
    id: "question",
    label: "❓ Quick Question",
    category: "Quick Question",
    promptText: "I have a quick question regarding your tech stack and experience.",
  },
];

type Step =
  | "GREETING"
  | "COLLECT_NAME"
  | "COLLECT_EMAIL"
  | "COLLECT_MESSAGE"
  | "REVIEW"
  | "SUBMITTING"
  | "SUCCESS"
  | "ERROR";

export function FeedbackSection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [step, setStep] = useState<Step>("GREETING");
  const [isTyping, setIsTyping] = useState(false);
  const [crackerBursts, setCrackerBursts] = useState<CrackerBurst[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    category: "General Feedback",
  });

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const getTimeString = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    setMessages([
      {
        id: "msg-welcome",
        sender: "agent",
        text: "👋 Hi there! I'm the AI Feedback Agent. I'm here to collect your feedback or answer recruiter and project inquiries. Select a suggested prompt below or type a message to start our conversation!",
        timestamp: getTimeString(),
      },
    ]);
  }, []);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleCrackerComplete = useCallback((id: number) => {
    setCrackerBursts((prev) => prev.filter((b) => b.id !== id));
  }, []);

  const addAgentResponseWithTyping = (
    responseMessage: string,
    nextStep?: Step,
    customDelay: number = 750
  ) => {
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-agent-${Date.now()}`,
          sender: "agent",
          text: responseMessage,
          timestamp: getTimeString(),
        },
      ]);
      if (nextStep) {
        setStep(nextStep);
      }
    }, customDelay);
  };

  const processUserInput = (text: string, categoryOverride?: string) => {
    if (!text.trim() || isTyping || step === "SUBMITTING") return;

    const userText = text.trim();
    const userMsg: Message = {
      id: `msg-user-${Date.now()}`,
      sender: "user",
      text: userText,
      timestamp: getTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    const activeCategory = categoryOverride || formData.category;

    if (step === "GREETING") {
      const category = categoryOverride || "General Feedback";
      setFormData((prev) => ({
        ...prev,
        category,
        message: userText,
      }));

      addAgentResponseWithTyping(
        `Got it! I've categorized this under "${category}". To personalize your feedback submission, could you please tell me your name?`,
        "COLLECT_NAME"
      );
    } else if (step === "COLLECT_NAME") {
      setFormData((prev) => ({ ...prev, name: userText }));

      addAgentResponseWithTyping(
        `Nice to meet you, ${userText}! What email address should I attach to your message so we can follow up?`,
        "COLLECT_EMAIL"
      );
    } else if (step === "COLLECT_EMAIL") {
      setFormData((prev) => ({ ...prev, email: userText }));

      if (!formData.message || formData.message === userText) {
        addAgentResponseWithTyping(
          `Thanks! Please share your main feedback message, comments, or inquiry below.`,
          "COLLECT_MESSAGE"
        );
      } else {
        addAgentResponseWithTyping(
          `Awesome! Here is a summary of your feedback:\n\n👤 Name: ${formData.name || userText}\n✉️ Email: ${userText}\n🏷️ Category: ${activeCategory}\n💬 Message: ${formData.message}\n\nClick "Submit Feedback" below to deliver your message asynchronously!`,
          "REVIEW"
        );
      }
    } else if (step === "COLLECT_MESSAGE") {
      setFormData((prev) => ({ ...prev, message: userText }));

      addAgentResponseWithTyping(
        `Great! Everything is ready for submission:\n\n👤 Name: ${formData.name || "Visitor"}\n✉️ Email: ${formData.email || "Not specified"}\n🏷️ Category: ${activeCategory}\n💬 Message: ${userText}\n\nClick "Submit Feedback" below to send your message directly.`,
        "REVIEW"
      );
    } else if (step === "REVIEW") {
      setFormData((prev) => ({
        ...prev,
        message: `${prev.message}\n\nAdditional Note: ${userText}`,
      }));
      addAgentResponseWithTyping(
        `Updated your message with those additional notes! Ready whenever you are.`,
        "REVIEW"
      );
    } else if (step === "SUCCESS") {
      handleRestartChat();
    }
  };

  const handlePromptSelect = (suggestion: PromptSuggestion) => {
    setFormData((prev) => ({ ...prev, category: suggestion.category }));
    processUserInput(suggestion.promptText, suggestion.category);
  };

  const handleFormSubmit = async () => {
    if (isTyping || step === "SUBMITTING") return;

    setStep("SUBMITTING");
    setIsTyping(true);

    const chatHistorySummary = messages
      .map((m) => `[${m.timestamp}] ${m.sender.toUpperCase()}: ${m.text}`)
      .join("\n");

    try {
      const response = await fetch("https://formspree.io/f/xqkjblnl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name || "Anonymous Portfolio Visitor",
          email: formData.email || "no-email@portfolio.local",
          message: formData.message || "Feedback submitted via AI Agent Chat.",
          category: formData.category,
          _subject: `New AI Agent Feedback: ${formData.category}`,
          chat_history: chatHistorySummary,
        }),
      });

      setIsTyping(false);

      if (response.ok) {
        setStep("SUCCESS");
        setCrackerBursts(createCrackerBursts(2));
        setMessages((prev) => [
          ...prev,
          {
            id: "msg-agent-success",
            sender: "agent",
            text: "🎉 Success! Your feedback payload has been transmitted to Formspree. Thank you for taking the time to connect!",
            timestamp: getTimeString(),
          },
        ]);
      } else {
        setStep("ERROR");
        setMessages((prev) => [
          ...prev,
          {
            id: "msg-agent-error",
            sender: "agent",
            text: "❌ Formspree submission failed. Please try re-submitting or try again later.",
            timestamp: getTimeString(),
          },
        ]);
      }
    } catch {
      setIsTyping(false);
      setStep("ERROR");
      setMessages((prev) => [
        ...prev,
        {
          id: "msg-agent-error",
          sender: "agent",
          text: "❌ Network error encountered during submission. Please check your connection and try again.",
          timestamp: getTimeString(),
        },
      ]);
    }
  };

  const handleRestartChat = () => {
    setFormData({ name: "", email: "", message: "", category: "General Feedback" });
    setStep("GREETING");
    setMessages([
      {
        id: `msg-welcome-${Date.now()}`,
        sender: "agent",
        text: "👋 Hi there! I'm the AI Feedback Agent. I'm here to collect your feedback or answer recruiter and project inquiries. Select a suggested prompt below or type a message to start our conversation!",
        timestamp: getTimeString(),
      },
    ]);
  };

  return (
    <section id="feedback" className="section-padding px-4 sm:px-6 pb-20 relative">
      <CrackerBurstOverlay bursts={crackerBursts} onComplete={handleCrackerComplete} />

      <div className="mx-auto max-w-4xl">
        <SectionHeading
          label="AI Agent Chat"
          title="Share Your Thoughts"
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={sectionViewport}
          transition={{ duration: 0.5 }}
          className="mt-10"
        >
          <GlowCard className="mx-auto max-w-3xl !p-0 overflow-hidden border border-[var(--border)] rounded-2xl shadow-2xl bg-[#0e0e11]/90">
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-[var(--border)] bg-[#141419]/80 px-6 py-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-[var(--accent-violet)] to-[var(--accent-cyan)] text-white shadow-lg shadow-[var(--accent-violet)]/20">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-[#141419]" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white flex items-center gap-2 font-display">
                    AI Agent Assistant
                    <span className="text-[10px] font-medium tracking-wider uppercase bg-[var(--accent-violet)]/20 text-[var(--accent-violet)] px-2 py-0.5 rounded-full border border-[var(--accent-violet)]/30">
                      Online
                    </span>
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Tactile Motion • Formspree Ingestion
                  </p>
                </div>
              </div>

              <MagneticButton
                variant="secondary"
                onClick={handleRestartChat}
                className="text-xs px-3.5 py-1.5 !rounded-lg border-[var(--border)] text-[var(--text-secondary)] hover:text-white"
              >
                Reset Chat
              </MagneticButton>
            </div>

            {/* Chat Messages */}
            <div
              ref={chatContainerRef}
              className="h-[400px] overflow-y-auto p-6 space-y-4 scroll-smooth bg-[var(--bg)]/40"
            >
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className={`flex flex-col ${
                      msg.sender === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-sm shadow-md transition-all ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-[var(--accent-violet)] to-[#6d28d9] text-white rounded-br-none"
                          : "bg-[#18181f] text-[var(--text-primary)] border border-[var(--accent-violet)]/20 shadow-[0_0_12px_rgba(139,92,246,0.08)] rounded-bl-none"
                      }`}
                    >
                      <div className="whitespace-pre-line leading-relaxed">{msg.text}</div>
                    </div>
                    <span className="mt-1 text-[10px] text-[var(--text-secondary)] px-1">
                      {msg.timestamp}
                    </span>
                  </motion.div>
                ))}

                {/* Shiny Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex flex-col items-start"
                  >
                    <div className="rounded-2xl rounded-bl-none bg-[#18181f] border border-[var(--accent-violet)]/30 px-4 py-3 shadow-[0_0_15px_rgba(139,92,246,0.12)] flex items-center gap-2">
                      <ShinyText
                        text="AI Agent is typing..."
                        color="#a1a1aa"
                        shineColor="#d8b4fe"
                        speed={1.5}
                        className="text-xs font-medium"
                      />
                      <div className="flex gap-1 items-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-violet)] animate-bounce" />
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-violet)] animate-bounce [animation-delay:0.2s]" />
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-violet)] animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Prompt Suggestion Chips */}
            {step === "GREETING" && messages.length <= 1 && (
              <div className="border-t border-[var(--border)]/60 bg-[#141419]/50 px-6 py-3">
                <p className="text-xs text-[var(--text-secondary)] mb-2 font-medium">
                  Prompt Suggestions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {PROMPT_SUGGESTIONS.map((s) => (
                    <MagneticButton
                      key={s.id}
                      variant="secondary"
                      onClick={() => handlePromptSelect(s)}
                      className="text-xs px-3.5 py-2 !rounded-xl bg-[#1c1c24] border-[var(--border)] text-white hover:border-[var(--accent-violet)] hover:text-[var(--accent-violet)]"
                    >
                      {s.label}
                    </MagneticButton>
                  ))}
                </div>
              </div>
            )}

            {/* Review Step Actions */}
            {step === "REVIEW" && !isTyping && (
              <div className="border-t border-[var(--border)]/60 bg-[#141419]/70 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-[var(--text-secondary)]">
                  Ready to send your feedback to Formspree?
                </p>
                <MagneticButton
                  variant="primary"
                  onClick={handleFormSubmit}
                  className="text-xs px-5 py-2.5"
                >
                  🚀 Submit Feedback
                </MagneticButton>
              </div>
            )}

            {/* Success / Error Actions */}
            {(step === "SUCCESS" || step === "ERROR") && !isTyping && (
              <div className="border-t border-[var(--border)]/60 bg-[#141419]/70 px-6 py-4 flex items-center justify-between">
                <p className="text-xs text-[var(--text-secondary)]">
                  {step === "SUCCESS"
                    ? "Submission delivered!"
                    : "Something went wrong."}
                </p>
                <MagneticButton
                  variant={step === "SUCCESS" ? "secondary" : "primary"}
                  onClick={step === "SUCCESS" ? handleRestartChat : handleFormSubmit}
                  className="text-xs px-5 py-2.5"
                >
                  {step === "SUCCESS" ? "Start New Conversation" : "🔄 Try Resubmitting"}
                </MagneticButton>
              </div>
            )}

            {/* Message Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                processUserInput(inputText);
              }}
              className="border-t border-[var(--border)] bg-[#141419] p-4 flex items-center gap-3"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isTyping || step === "SUBMITTING"}
                placeholder={
                  step === "COLLECT_NAME"
                    ? "Type your name..."
                    : step === "COLLECT_EMAIL"
                    ? "Type your email address (e.g., jane@example.com)..."
                    : step === "COLLECT_MESSAGE"
                    ? "Type your feedback or message..."
                    : "Type a message or pick a suggestion chip..."
                }
                className="flex-1 rounded-xl border border-[var(--border)] bg-[#0e0e11] px-4 py-3 text-sm text-white placeholder:text-[var(--text-secondary)] outline-none transition-colors focus:border-[var(--accent-violet)] focus:bg-[var(--bg)] disabled:opacity-50"
              />

              <MagneticButton
                variant="primary"
                onClick={() => processUserInput(inputText)}
                className="px-5 py-3 !rounded-xl min-w-[90px]"
              >
                {step === "SUBMITTING" ? (
                  <ShinyText text="Sending" color="#fff" shineColor="#d8b4fe" speed={1} />
                ) : (
                  "Send"
                )}
              </MagneticButton>
            </form>
          </GlowCard>
        </motion.div>
      </div>
    </section>
  );
}
