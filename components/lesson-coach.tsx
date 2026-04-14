"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, Sparkles, X } from "lucide-react";

type LessonCoachProps = {
  module: string;
  lessonTitle: string;
  personaLead: string;
  conceptTitles: string[];
  conceptSummaries: string[];
  suggestedPrompts: string[];
};

type CoachResponse = {
  answer: string;
};

export default function LessonCoach({
  module,
  lessonTitle,
  personaLead,
  conceptTitles,
  conceptSummaries,
  suggestedPrompts,
}: LessonCoachProps) {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const placeholder = useMemo(() => {
    return "Ask about this lesson in simple language";
  }, []);

  async function askCoach(message: string) {
    const cleaned = message.trim();
    if (!cleaned) return;

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/lesson-coach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          module,
          lessonTitle,
          personaLead,
          conceptTitles,
          conceptSummaries,
          question: cleaned,
        }),
      });

      if (!response.ok) {
        throw new Error("Could not get a response right now.");
      }

      const data = (await response.json()) as CoachResponse;
      setAnswer(data.answer || "I could not answer that clearly right now.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong.";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await askCoach(question);
  }

  return (
    <>
      <div className="fixed bottom-24 right-5 z-40 md:bottom-24 md:right-8">
        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          whileHover={{ y: -2, scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="group relative h-16 w-16 rounded-full"
          aria-label="Open lesson coach"
        >
          <div className="absolute inset-0 rounded-full bg-violet-500/30 blur-xl transition group-hover:bg-violet-400/40" />
          <div className="absolute inset-[3px] rounded-full bg-[radial-gradient(circle_at_30%_28%,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.35)_16%,rgba(196,181,253,0.18)_28%,rgba(0,0,0,0)_29%),linear-gradient(145deg,#8b5cf6_0%,#4f46e5_42%,#1e1b4b_100%)] shadow-[0_18px_40px_rgba(76,29,149,0.45),inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-10px_24px_rgba(10,10,30,0.45)]" />
          <div className="absolute inset-[9px] rounded-full border border-white/20 bg-white/5" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Bot className="h-7 w-7 text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)]" />
          </div>
        </motion.button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="fixed bottom-44 right-5 z-40 w-[calc(100vw-2.5rem)] max-w-[390px] md:bottom-44 md:right-8"
          >
            <div className="flex h-[70vh] max-h-[680px] min-h-[520px] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#171327]/95 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
              <div className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.25),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-100">
                      <Sparkles className="h-3.5 w-3.5" />
                      Lesson Coach
                    </div>
                    <div
                      className="mt-3 text-2xl font-semibold tracking-tight text-white"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      Ask for help
                    </div>
                    <p className="mt-2 text-sm leading-7 text-slate-300">
                      I can explain this lesson in simpler words, give examples,
                      or help with the next action.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
                    aria-label="Close lesson coach"
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>

              <div className="flex min-h-0 flex-1 flex-col">
                <div className="min-h-0 flex-1 overflow-y-auto p-5">
                  <div className="rounded-[22px] border border-white/10 bg-slate-950/25 p-4">
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Current lesson
                    </div>
                    <div className="mt-2 text-sm font-semibold text-white">
                      {lessonTitle}
                    </div>
                    <div className="mt-2 text-sm leading-7 text-slate-300">
                      {personaLead}
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Suggested prompts
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {suggestedPrompts.map((prompt) => (
                        <button
                          key={prompt}
                          type="button"
                          onClick={() => {
                            setQuestion(prompt);
                            void askCoach(prompt);
                          }}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-left text-xs font-medium text-slate-200 transition hover:bg-white/10"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {errorMessage ? (
                    <div className="mt-4 rounded-[22px] border border-red-300/20 bg-red-300/10 p-4 text-sm leading-7 text-red-100">
                      {errorMessage}
                    </div>
                  ) : null}

                  {answer ? (
                    <div className="mt-4 rounded-[22px] border border-white/10 bg-white/5 p-4">
                      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-100">
                        Coach answer
                      </div>
                      <div className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-200">
                        {answer}
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 rounded-[22px] border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-400">
                      Ask a question or tap one of the suggested prompts.
                    </div>
                  )}
                </div>

                <div className="border-t border-white/10 bg-[#171327]/95 p-4">
                  <form onSubmit={handleSubmit}>
                    <div className="rounded-[22px] border border-white/10 bg-slate-950/25 p-3">
                      <textarea
                        value={question}
                        onChange={(event) => setQuestion(event.target.value)}
                        rows={3}
                        placeholder={placeholder}
                        className="w-full resize-none bg-transparent text-sm leading-7 text-white outline-none placeholder:text-slate-500"
                      />
                      <div className="mt-2 flex justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setQuestion("");
                            setAnswer("");
                            setErrorMessage("");
                          }}
                          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
                        >
                          Clear
                        </button>

                        <button
                          type="submit"
                          disabled={loading || !question.trim()}
                          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <Send className="h-4 w-4" />
                          {loading ? "Thinking..." : "Ask"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}