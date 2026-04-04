import type { AssessmentInput, MoneywiseProfile } from "@/lib/types/assessment";

const STORAGE_KEYS = {
  assessment: "moneywise.assessment",
  profile: "moneywise.profile",
  onboardingSeen: "moneywise.onboardingSeen",
} as const;

export const defaultAssessmentInput: AssessmentInput = {
  lifeStage: "",
  ageRange: "",
  paycheckStatus: "",
  confidenceLevel: "",
  emotionalStates: [],
  helpAreas: [],
  freeTextGoal: "",
};

function canUseStorage() {
  return typeof window !== "undefined";
}

export function getStoredAssessment(): AssessmentInput {
  if (!canUseStorage()) return defaultAssessmentInput;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.assessment);
    if (!raw) return defaultAssessmentInput;
    return { ...defaultAssessmentInput, ...JSON.parse(raw) } as AssessmentInput;
  } catch {
    return defaultAssessmentInput;
  }
}

export function saveAssessment(input: AssessmentInput) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(STORAGE_KEYS.assessment, JSON.stringify(input));
}

export function getStoredProfile(): MoneywiseProfile | null {
  if (!canUseStorage()) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.profile);
    if (!raw) return null;
    return JSON.parse(raw) as MoneywiseProfile;
  } catch {
    return null;
  }
}

export function saveProfile(profile: MoneywiseProfile) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(profile));
}

export function markOnboardingSeen() {
  if (!canUseStorage()) return;
  window.localStorage.setItem(STORAGE_KEYS.onboardingSeen, "true");
}

export function getOnboardingSeen() {
  if (!canUseStorage()) return false;
  return window.localStorage.getItem(STORAGE_KEYS.onboardingSeen) === "true";
}
