"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/app-shell";
import { getStoredProfile } from "@/lib/storage/moneywise-storage";
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("This is a placeholder login screen for now.");
  useEffect(() => { const profile = getStoredProfile(); if (profile?.email) setEmail(profile.email); }, []);
  function handleContinue() { if (!email.trim()) { setMessage("Enter the email you saved in this browser."); return; } setMessage("Continuing in local demo mode."); router.push("/plan"); }
  return <AppShell><div className="px-6 py-16 md:px-10 lg:px-14"><div className="mx-auto max-w-xl rounded-[30px] bg-white p-8 shadow-sm ring-1 ring-black/5"><h1 className="text-3xl font-semibold tracking-tight">Log in</h1><p className="mt-3 text-slate-600">{message}</p><div className="mt-6 space-y-4"><input className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><button onClick={handleContinue} className="w-full rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white">Continue</button></div></div></div></AppShell>;
}
