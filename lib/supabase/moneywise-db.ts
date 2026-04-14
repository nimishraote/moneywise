import type { AssessmentInput, MoneywiseProfile } from "@/lib/types/assessment";
import type { MoneywiseProgressState } from "@/lib/storage/moneywise-storage";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

function requireSupabase() {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    throw new Error(
      "Supabase database is not available right now because environment variables are missing."
    );
  }

  return supabase;
}

export async function upsertMoneywiseProfile(
  userId: string,
  profile: MoneywiseProfile
) {
  const supabase = requireSupabase();

  const payload = {
    id: userId,
    email: profile.email ?? null,
    first_name: profile.firstName ?? null,
  };

  const { error } = await supabase
    .from("moneywise_profiles")
    .upsert(payload, { onConflict: "id" });

  if (error) throw error;
}

export async function getMoneywiseProfile(userId: string) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("moneywise_profiles")
    .select("id, email, first_name")
    .eq("id", userId)
    .maybeSingle();

  if (error) throw error;

  if (!data) return null;

  return {
    firstName: data.first_name ?? "",
    email: data.email ?? "",
  } as MoneywiseProfile;
}

export async function upsertMoneywiseAssessment(
  userId: string,
  assessment: AssessmentInput
) {
  const supabase = requireSupabase();

  const { error } = await supabase
    .from("moneywise_assessments")
    .upsert(
      {
        user_id: userId,
        assessment,
      },
      { onConflict: "user_id" }
    );

  if (error) throw error;
}

export async function getMoneywiseAssessment(userId: string) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("moneywise_assessments")
    .select("assessment")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;

  return (data?.assessment ?? null) as AssessmentInput | null;
}

export async function upsertMoneywiseProgress(
  userId: string,
  progress: MoneywiseProgressState
) {
  const supabase = requireSupabase();

  const { error } = await supabase
    .from("moneywise_progress")
    .upsert(
      {
        user_id: userId,
        progress,
      },
      { onConflict: "user_id" }
    );

  if (error) throw error;
}

export async function getMoneywiseProgress(userId: string) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("moneywise_progress")
    .select("progress")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;

  return (data?.progress ?? null) as MoneywiseProgressState | null;
}