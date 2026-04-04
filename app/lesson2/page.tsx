"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  defaultAssessmentInput,
  getStoredAssessment,
} from "@/lib/storage/moneywise-storage";
import { buildPersonalizedPlan } from "@/lib/personalization/build-plan";
import { getLessonHref } from "@/lib/content/lesson-content";

export default function LessonTwoPage() {
  const router = useRouter();

  const secondLessonHref = useMemo(() => {
    const answers = getStoredAssessment() || defaultAssessmentInput;
    const plan = buildPersonalizedPlan(answers);
    const secondModule =
      plan.recommendedPath.modules[1] ?? plan.recommendedPath.modules[0];
    return getLessonHref(secondModule);
  }, []);

  useEffect(() => {
    router.replace(secondLessonHref);
  }, [router, secondLessonHref]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#120f1e] px-6 text-white">
      <div className="text-center">
        <div
          className="text-3xl font-semibold tracking-tight"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Redirecting to your next lesson...
        </div>
        <p className="mt-4 text-sm text-slate-300">
          Taking you to the next recommended topic in your learning path.
        </p>
      </div>
    </div>
  );
}