import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export type AuthUserSummary = {
  id: string;
  email: string | null;
};

export async function signUpWithEmail(
  email: string,
  password: string,
  firstName: string
) {
  const supabase = getSupabaseBrowserClient();

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
  const supabase = getSupabaseBrowserClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data;
}

export async function signOutCurrentUser() {
  const supabase = getSupabaseBrowserClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentAuthUser(): Promise<AuthUserSummary | null> {
  const supabase = getSupabaseBrowserClient();
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
  const { data, error } = await supabase.auth.getSession();

  if (error) throw error;
  return data.session ?? null;
}

export function subscribeToAuthChanges(
  callback: (user: AuthUserSummary | null) => void
) {
  const supabase = getSupabaseBrowserClient();

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