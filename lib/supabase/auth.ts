import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export type AuthUserSummary = {
  id: string;
  email: string | null;
};

function requireSupabase() {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    throw new Error(
      "Authentication is not available right now because Supabase is not configured."
    );
  }

  return supabase;
}

export async function signUpWithEmail(
  email: string,
  password: string,
  firstName: string
) {
  const supabase = requireSupabase();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
      },
    },
  });

  if (error) throw error;

  return data;
}

export async function signInWithEmail(email: string, password: string) {
  const supabase = requireSupabase();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data;
}

export async function signOutCurrentUser() {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return;

  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentAuthUser(): Promise<AuthUserSummary | null> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw error;
  if (!data.user) return null;

  return {
    id: data.user.id,
    email: data.user.email ?? null,
  };
}

export async function getCurrentSession() {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return null;

  const { data, error } = await supabase.auth.getSession();

  if (error) throw error;
  return data.session ?? null;
}

export function subscribeToAuthChanges(
  callback: (user: AuthUserSummary | null) => void
) {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    callback(null);
    return () => {};
  }

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    const user = session?.user
      ? {
          id: session.user.id,
          email: session.user.email ?? null,
        }
      : null;

    callback(user);
  });

  return () => {
    subscription.unsubscribe();
  };
}