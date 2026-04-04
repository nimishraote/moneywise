"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LessonTwoPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/lesson1");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#120f1e] text-white flex items-center justify-center px-6">
      <div className="text-center">
        <div
          className="text-3xl font-semibold tracking-tight"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Redirecting to Learn...
        </div>
        <p className="mt-4 text-sm text-slate-300">
          We combined the lesson flow into one page for a simpler learning experience.
        </p>
      </div>
    </div>
  );
}