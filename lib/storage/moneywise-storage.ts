import type { AssessmentInput, MoneywiseProfile } from "@/lib/types/assessment";
import type { RecommendedModule } from "@/lib/types/personalized-plan";

const STORAGE_KEYS = {
  assessment: "moneywise.assessment",
  profile: "moneywise.profile",
  onboardingSeen: "moneywise.onboardingSeen",
  progress: "moneywise.progress.v1",
} as const;

type LessonProgressRecord = Partial<
  Record<
    RecommendedModule,
    {
      startedAt?: string;
      completedAt?: string;
    }
  >
>;

export type MoneywiseProgressState = {
  currentModule: RecommendedModule | null;
  lessons: LessonProgressRecord;
  actions: Record<string, boolean>;
  updatedAt?: string;
};

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

  topPriority: [],
};

const defaultProgressState: MoneywiseProgressState = {
  currentModule: null,
  lessons: {},
  actions: {},
  updatedAt: undefined,
};

function canUseStorage() {
  return typeof window !== "undefined";
}

function getStorage() {
  if (!canUseStorage()) return null;
  return window.localStorage;
}

function withTimestamp<T extends object>(value: T): T & { updatedAt: string } {
  return {
    ...value,
    updatedAt: new Date().toISOString(),
  };
}

export function buildLessonActionKey(
  module: RecommendedModule,
  conceptId: string,
  actionIndex: number
) {
  return `${module}::${conceptId}::${actionIndex}`;
}

export function resetMoneywiseSession() {
  const storage = getStorage();
  if (!storage) return;
  storage.removeItem(STORAGE_KEYS.assessment);
  storage.removeItem(STORAGE_KEYS.profile);
  storage.removeItem(STORAGE_KEYS.onboardingSeen);
  storage.removeItem(STORAGE_KEYS.progress);
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
  window.dispatchEvent(new Event("moneywise-storage-updated"));
}

export function clearStoredAssessment() {
  const storage = getStorage();
  if (!storage) return;
  storage.removeItem(STORAGE_KEYS.assessment);
  window.dispatchEvent(new Event("moneywise-storage-updated"));
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
  window.dispatchEvent(new Event("moneywise-storage-updated"));
}

export function clearStoredProfile() {
  const storage = getStorage();
  if (!storage) return;
  storage.removeItem(STORAGE_KEYS.profile);
  window.dispatchEvent(new Event("moneywise-storage-updated"));
}

export function markOnboardingSeen() {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(STORAGE_KEYS.onboardingSeen, "true");
  window.dispatchEvent(new Event("moneywise-storage-updated"));
}

export function getOnboardingSeen() {
  const storage = getStorage();
  if (!storage) return false;
  return storage.getItem(STORAGE_KEYS.onboardingSeen) === "true";
}

export function getProgressState(): MoneywiseProgressState {
  const storage = getStorage();
  if (!storage) return defaultProgressState;

  try {
    const raw = storage.getItem(STORAGE_KEYS.progress);
    if (!raw) return defaultProgressState;

    const parsed = JSON.parse(raw) as Partial<MoneywiseProgressState>;
    return {
      currentModule: parsed.currentModule ?? null,
      lessons: parsed.lessons ?? {},
      actions: parsed.actions ?? {},
      updatedAt: parsed.updatedAt,
    };
  } catch {
    return defaultProgressState;
  }
}

export function saveProgressState(progress: MoneywiseProgressState) {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(STORAGE_KEYS.progress, JSON.stringify(withTimestamp(progress)));
  window.dispatchEvent(new Event("moneywise-storage-updated"));
}

export function clearProgressState() {
  const storage = getStorage();
  if (!storage) return;
  storage.removeItem(STORAGE_KEYS.progress);
  window.dispatchEvent(new Event("moneywise-storage-updated"));
}

export function setCurrentModule(module: RecommendedModule) {
  const current = getProgressState();
  saveProgressState({
    ...current,
    currentModule: module,
  });
}

export function markLessonStarted(module: RecommendedModule) {
  const current = getProgressState();
  const existing = current.lessons[module] ?? {};

  saveProgressState({
    ...current,
    currentModule: module,
    lessons: {
      ...current.lessons,
      [module]: {
        ...existing,
        startedAt: existing.startedAt ?? new Date().toISOString(),
      },
    },
  });
}

export function markLessonCompleted(module: RecommendedModule) {
  const current = getProgressState();
  const existing = current.lessons[module] ?? {};

  saveProgressState({
    ...current,
    currentModule: module,
    lessons: {
      ...current.lessons,
      [module]: {
        ...existing,
        startedAt: existing.startedAt ?? new Date().toISOString(),
        completedAt: new Date().toISOString(),
      },
    },
  });
}

export function isLessonStarted(module: RecommendedModule) {
  const current = getProgressState();
  return Boolean(current.lessons[module]?.startedAt);
}

export function isLessonCompleted(module: RecommendedModule) {
  const current = getProgressState();
  return Boolean(current.lessons[module]?.completedAt);
}

export function setActionCompleted(actionKey: string, completed: boolean) {
  const current = getProgressState();
  saveProgressState({
    ...current,
    actions: {
      ...current.actions,
      [actionKey]: completed,
    },
  });
}

export function isActionCompleted(actionKey: string) {
  const current = getProgressState();
  return Boolean(current.actions[actionKey]);
}

export function getCompletedLessonCount(modules?: RecommendedModule[]) {
  const progress = getProgressState();

  if (!modules || modules.length === 0) {
    return Object.values(progress.lessons).filter((item) => item?.completedAt).length;
  }

  return modules.filter((module) => Boolean(progress.lessons[module]?.completedAt)).length;
}

export function getStartedLessonCount(modules?: RecommendedModule[]) {
  const progress = getProgressState();

  if (!modules || modules.length === 0) {
    return Object.values(progress.lessons).filter((item) => item?.startedAt).length;
  }

  return modules.filter((module) => Boolean(progress.lessons[module]?.startedAt)).length;
}

export function getNextIncompleteModule(
  modules: RecommendedModule[]
): RecommendedModule | null {
  const progress = getProgressState();

  for (const module of modules) {
    if (!progress.lessons[module]?.completedAt) {
      return module;
    }
  }

  return modules[0] ?? null;
}