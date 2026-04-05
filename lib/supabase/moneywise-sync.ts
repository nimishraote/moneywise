import {
  defaultAssessmentInput,
  getProgressState,
  getStoredAssessment,
  getStoredProfile,
  saveAssessment,
  saveProfile,
  saveProgressState,
  type MoneywiseProgressState,
} from "@/lib/storage/moneywise-storage";
import type { AssessmentInput, MoneywiseProfile } from "@/lib/types/assessment";
import {
  getMoneywiseAssessment,
  getMoneywiseProfile,
  getMoneywiseProgress,
  upsertMoneywiseAssessment,
  upsertMoneywiseProfile,
  upsertMoneywiseProgress,
} from "@/lib/supabase/moneywise-db";

function normalizeValue(value?: string | null) {
  return (value ?? "").trim();
}

function getAssessmentCompletenessScore(input: AssessmentInput | null | undefined) {
  if (!input) return 0;

  const fields: Array<Exclude<keyof AssessmentInput, "topPriority">> = [
    "lifeStage",
    "ageRange",
    "livingSituation",
    "primaryMoneySource",
    "incomePattern",
    "endOfMonthSituation",
    "mainSpendingCategory",
    "hasCreditCard",
    "moneyCheckFrequency",
    "moneyHabitStyle",
    "stressLevel",
    "confidenceLevel",
    "basicsStocks",
    "basicsIndexFunds",
    "basicsStockMarket",
    "basicsInterest",
    "basicsCredit",
    "basicsBudgeting",
  ];

  let score = 0;

  for (const field of fields) {
    if (normalizeValue(input[field])) score += 1;
  }

  score += Array.isArray(input.topPriority) ? input.topPriority.length : 0;

  return score;
}

function mergeProfile(
  localProfile: MoneywiseProfile | null,
  remoteProfile: MoneywiseProfile | null,
  authEmail?: string | null
): MoneywiseProfile | null {
  const firstName =
    normalizeValue(localProfile?.firstName) || normalizeValue(remoteProfile?.firstName);
  const email =
    normalizeValue(authEmail) ||
    normalizeValue(localProfile?.email) ||
    normalizeValue(remoteProfile?.email);

  if (!firstName && !email) return null;

  return {
    ...remoteProfile,
    ...localProfile,
    firstName,
    email,
  };
}

function mergeAssessment(
  localAssessment: AssessmentInput,
  remoteAssessment: AssessmentInput | null
): AssessmentInput {
  const localScore = getAssessmentCompletenessScore(localAssessment);
  const remoteScore = getAssessmentCompletenessScore(remoteAssessment);

  const base =
    localScore >= remoteScore ? localAssessment : remoteAssessment ?? localAssessment;
  const fallback = localScore >= remoteScore ? remoteAssessment : localAssessment;

  return {
    ...defaultAssessmentInput,
    ...(fallback ?? defaultAssessmentInput),
    ...base,
    topPriority:
      (base.topPriority && base.topPriority.length > 0
        ? base.topPriority
        : fallback?.topPriority) ?? [],
  };
}

function mergeTimestamp(a?: string, b?: string) {
  if (!a) return b;
  if (!b) return a;
  return new Date(a).getTime() >= new Date(b).getTime() ? a : b;
}

function mergeProgress(
  localProgress: MoneywiseProgressState,
  remoteProgress: MoneywiseProgressState | null
): MoneywiseProgressState {
  const remote = remoteProgress ?? {
    currentModule: null,
    lessons: {},
    actions: {},
    updatedAt: undefined,
  };

  const localWins =
    new Date(localProgress.updatedAt ?? 0).getTime() >=
    new Date(remote.updatedAt ?? 0).getTime();

  const lessonKeys = new Set([
    ...Object.keys(localProgress.lessons),
    ...Object.keys(remote.lessons),
  ]);

  const lessons: MoneywiseProgressState["lessons"] = {};

  for (const key of lessonKeys) {
    const localLesson = localProgress.lessons[key as keyof typeof localProgress.lessons];
    const remoteLesson = remote.lessons[key as keyof typeof remote.lessons];

    lessons[key as keyof typeof lessons] = {
      startedAt:
        localLesson?.startedAt && remoteLesson?.startedAt
          ? new Date(localLesson.startedAt).getTime() <=
            new Date(remoteLesson.startedAt).getTime()
            ? localLesson.startedAt
            : remoteLesson.startedAt
          : localLesson?.startedAt ?? remoteLesson?.startedAt,
      completedAt: mergeTimestamp(localLesson?.completedAt, remoteLesson?.completedAt),
    };
  }

  const actionKeys = new Set([
    ...Object.keys(localProgress.actions),
    ...Object.keys(remote.actions),
  ]);

  const actions: Record<string, boolean> = {};

  for (const key of actionKeys) {
    actions[key] = Boolean(localProgress.actions[key] || remote.actions[key]);
  }

  return {
    currentModule: localWins
      ? localProgress.currentModule ?? remote.currentModule
      : remote.currentModule ?? localProgress.currentModule,
    lessons,
    actions,
    updatedAt: mergeTimestamp(localProgress.updatedAt, remote.updatedAt),
  };
}

function hasAnyAssessmentValue(input: AssessmentInput) {
  return getAssessmentCompletenessScore(input) > 0;
}

export async function syncMoneywiseUserData(userId: string, authEmail?: string | null) {
  const [remoteProfile, remoteAssessment, remoteProgress] = await Promise.all([
    getMoneywiseProfile(userId),
    getMoneywiseAssessment(userId),
    getMoneywiseProgress(userId),
  ]);

  const localProfile = getStoredProfile();
  const localAssessment = getStoredAssessment();
  const localProgress = getProgressState();

  const mergedProfile = mergeProfile(localProfile, remoteProfile, authEmail);
  const mergedAssessment = mergeAssessment(localAssessment, remoteAssessment);
  const mergedProgress = mergeProgress(localProgress, remoteProgress);

  if (mergedProfile) {
    saveProfile(mergedProfile);
    await upsertMoneywiseProfile(userId, mergedProfile);
  }

  if (hasAnyAssessmentValue(mergedAssessment)) {
    saveAssessment(mergedAssessment);
    await upsertMoneywiseAssessment(userId, mergedAssessment);
  }

  saveProgressState(mergedProgress);
  await upsertMoneywiseProgress(userId, mergedProgress);

  return {
    profile: mergedProfile,
    assessment: mergedAssessment,
    progress: mergedProgress,
  };
}