"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/app-shell";
import { getStoredProfile, saveProfile } from "@/lib/storage/moneywise-storage";
export default function SignupPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("This is still local-only for now. It saves your profile in this browser so the app can feel more personalized.");
  useEffect(() => { const profile = getStoredProfile(); if (profile?.firstName) setFirstName(profile.firstName); if (profile?.email) setEmail(profile.email); }, []);
  function handleSubmit() { if (!firstName.trim() || !email.trim()) { setMessage("Please add your first name and email."); return; } saveProfile({ firstName: firstName.trim(), email: email.trim(), createdAt: new Date().toISOString() }); setMessage("Saved in this browser. Real auth can be wired in next with Supabase."); router.push("/assessment"); }
  return <AppShell><div className="px-6 py-16 md:px-10 lg:px-14"><div className="mx-auto max-w-xl rounded-[30px] bg-white p-8 shadow-sm ring-1 ring-black/5"><h1 className="text-3xl font-semibold tracking-tight">Create your account</h1><p className="mt-3 text-slate-600">{message}</p><div className="mt-6 space-y-4"><input className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} /><input className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><button onClick={handleSubmit} className="w-full rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white">Save and continue</button></div></div></div></AppShell>;
}
