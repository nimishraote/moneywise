import type { AssessmentInput, MoneywiseProfile } from "@/lib/types/assessment";

const STORAGE_KEYS = {
  assessment: "moneywise.assessment",
  profile: "moneywise.profile",
  onboardingSeen: "moneywise.onboardingSeen",
} as const;

export const defaultAssessmentInput: AssessmentInput = {
  lifeStage: "",
  ageRange: "",
  livingSituation: "",

  primaryMoneySource: "",
  incomePattern: "",
  endOfMonthSituation: "",
  mainSpendingCategory: "",
  hasCreditCard: "",

  moneyCheckFrequency: "",
  moneyHabitStyle: "",
  stressLevel: "",
  confidenceLevel: "",

  basicsStocks: "",
  basicsIndexFunds: "",
  basicsStockMarket: "",
  basicsInterest: "",
  basicsCredit: "",
  basicsBudgeting: "",

  topPriority: "",
};

function canUseStorage() {
  return typeof window !== "undefined";
}

function getStorage() {
  if (!canUseStorage()) return null;
  return window.sessionStorage;
}

export function resetMoneywiseSession() {
  const storage = getStorage();
  if (!storage) return;
  storage.removeItem(STORAGE_KEYS.assessment);
  storage.removeItem(STORAGE_KEYS.profile);
  storage.removeItem(STORAGE_KEYS.onboardingSeen);
}

export function getStoredAssessment(): AssessmentInput {
  const storage = getStorage();
  if (!storage) return defaultAssessmentInput;

  try {
    const raw = storage.getItem(STORAGE_KEYS.assessment);
    if (!raw) return defaultAssessmentInput;
    return { ...defaultAssessmentInput, ...JSON.parse(raw) } as AssessmentInput;
  } catch {
    return defaultAssessmentInput;
  }
}

export function saveAssessment(input: AssessmentInput) {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(STORAGE_KEYS.assessment, JSON.stringify(input));
}

export function clearStoredAssessment() {
  const storage = getStorage();
  if (!storage) return;
  storage.removeItem(STORAGE_KEYS.assessment);
}

export function getStoredProfile(): MoneywiseProfile | null {
  const storage = getStorage();
  if (!storage) return null;

  try {
    const raw = storage.getItem(STORAGE_KEYS.profile);
    if (!raw) return null;
    return JSON.parse(raw) as MoneywiseProfile;
  } catch {
    return null;
  }
}

export function saveProfile(profile: MoneywiseProfile) {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(STORAGE_KEYS.profile, JSON.stringify(profile));
}

export function clearStoredProfile() {
  const storage = getStorage();
  if (!storage) return;
  storage.removeItem(STORAGE_KEYS.profile);
}

export function markOnboardingSeen() {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(STORAGE_KEYS.onboardingSeen, "true");
}

export function getOnboardingSeen() {
  const storage = getStorage();
  if (!storage) return false;
  return storage.getItem(STORAGE_KEYS.onboardingSeen) === "true";
}