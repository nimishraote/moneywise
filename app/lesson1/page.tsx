"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  defaultAssessmentInput,
  getStoredAssessment,
} from "@/lib/storage/moneywise-storage";
import { buildPersonalizedPlan } from "@/lib/personalization/build-plan";
import { getLessonHref } from "@/lib/content/lesson-content";

export default function LessonOnePage() {
  const router = useRouter();

  const firstLessonHref = useMemo(() => {
    const answers = getStoredAssessment() || defaultAssessmentInput;
    const plan = buildPersonalizedPlan(answers);
    const topModule = plan.recommendedPath.modules[0];
    return getLessonHref(topModule);
  }, []);

  useEffect(() => {
    router.replace(firstLessonHref);
  }, [firstLessonHref, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#120f1e] px-6 text-white">
      <div className="text-center">
        <div
          className="text-3xl font-semibold tracking-tight"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Redirecting to your lesson...
        </div>
        <p className="mt-4 text-sm text-slate-300">
          Taking you to the best starting topic based on your plan.
        </p>
      </div>
    </div>
  );
}