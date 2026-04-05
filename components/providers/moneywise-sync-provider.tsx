"use client";

import { useEffect, useRef } from "react";
import { getCurrentAuthUser, subscribeToAuthChanges } from "@/lib/supabase/auth";
import { syncMoneywiseUserData } from "@/lib/supabase/moneywise-sync";

export default function MoneywiseSyncProvider() {
  const currentUserIdRef = useRef<string | null>(null);
  const syncingRef = useRef(false);
  const queuedRef = useRef(false);

  async function runSync(userId: string, email?: string | null) {
    if (syncingRef.current) {
      queuedRef.current = true;
      return;
    }

    syncingRef.current = true;

    try {
      await syncMoneywiseUserData(userId, email);
    } catch {
      // Keep this silent for now so the app experience does not break.
    } finally {
      syncingRef.current = false;

      if (queuedRef.current) {
        queuedRef.current = false;
        void runSync(userId, email);
      }
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function initialize() {
      try {
        const user = await getCurrentAuthUser();
        if (cancelled) return;

        currentUserIdRef.current = user?.id ?? null;

        if (user?.id) {
          await runSync(user.id, user.email);
        }
      } catch {
        if (cancelled) return;
        currentUserIdRef.current = null;
      }
    }

    void initialize();

    const unsubscribe = subscribeToAuthChanges((user) => {
      currentUserIdRef.current = user?.id ?? null;

      if (user?.id) {
        void runSync(user.id, user.email);
      }
    });

    function handleStorageUpdated() {
      const userId = currentUserIdRef.current;
      if (!userId) return;
      void runSync(userId);
    }

    window.addEventListener("moneywise-storage-updated", handleStorageUpdated);

    return () => {
      cancelled = true;
      unsubscribe();
      window.removeEventListener("moneywise-storage-updated", handleStorageUpdated);
    };
  }, []);

  return null;
}