import { useCallback, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { supabase, getSupabaseStatus } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { SupabaseService } from '@/lib/supabase-service';
import type { MealPlan, UserProfile } from '@/types/domain';

function JsonBlock({ value }: { value: unknown }) {
  const text = useMemo(() => {
    try {
      return JSON.stringify(value, null, 2);
    } catch {
      return String(value);
    }
  }, [value]);

  return (
    <pre className="text-xs bg-muted/50 border rounded-lg p-3 overflow-auto max-h-[420px]">
      {text}
    </pre>
  );
}

export function SupabaseDebugPage() {
  const status = getSupabaseStatus();
  const { user, session } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<any>(null);

  const isDev = Boolean(import.meta.env.DEV);

  const runChecks = useCallback(async () => {
    setError('');
    setResult(null);

    if (!isDev) {
      setError('Supabase debug page is available only in development mode.');
      return;
    }

    if (!status.configured || !supabase) {
      setError('Supabase is not configured (missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).');
      return;
    }

    setLoading(true);
    try {
      const authUser = await SupabaseService.getCurrentUser();

      let profile: UserProfile | null = null;
      let currentPlan: MealPlan | null = null;
      let savedPlansCount = 0;

      if (authUser) {
        profile = await SupabaseService.getUserProfile();
        currentPlan = await SupabaseService.getCurrentMealPlan();
        const savedPlans = await SupabaseService.getSavedMealPlans();
        savedPlansCount = savedPlans.length;
      }

      setResult({
        env: {
          configured: status.configured,
          hasUrl: status.hasUrl,
          hasAnonKey: status.hasAnonKey,
        },
        authContext: {
          user: user ? { id: user.id, email: user.email, email_confirmed_at: (user as any).email_confirmed_at } : null,
          session: session ? { user_id: session.user.id, expires_at: session.expires_at } : null,
        },
        supabase: {
          getUser: authUser ? { id: authUser.id, email: authUser.email, email_confirmed_at: (authUser as any).email_confirmed_at } : null,
        },
        db: {
          profile,
          currentMealPlan: currentPlan ? { plan_id: currentPlan.plan_id, generated_at: currentPlan.generated_at } : null,
          savedPlansCount,
        },
        notes: {
          rls: 'This page can only read what your RLS policies allow for the current authenticated user.',
        },
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [isDev, session, status.configured, status.hasAnonKey, status.hasUrl, user]);

  if (!isDev) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <Alert variant="destructive">
            <AlertTitle>Not Available</AlertTitle>
            <AlertDescription>This debug page is only available in development mode.</AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Supabase Debug</h1>
          <p className="text-sm text-muted-foreground">Inspect the current auth user and what data is readable via anon key + RLS.</p>
        </div>

        {!status.configured && (
          <Alert variant="destructive">
            <AlertTitle>Supabase Not Configured</AlertTitle>
            <AlertDescription>
              Missing <code className="bg-muted px-1 py-0.5 rounded">VITE_SUPABASE_URL</code> and/or{' '}
              <code className="bg-muted px-1 py-0.5 rounded">VITE_SUPABASE_ANON_KEY</code>.
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex items-center gap-2">
          <Button onClick={runChecks} disabled={loading}>
            {loading ? 'Running…' : 'Run checks'}
          </Button>
          <Button variant="outline" onClick={() => window.history.back()} disabled={loading}>
            Back
          </Button>
        </div>

        {result && <JsonBlock value={result} />}

        <div className="text-xs text-muted-foreground">
          Tip: open <code className="bg-muted px-1 py-0.5 rounded">/debug/supabase</code> while logged in.
        </div>
      </div>
    </div>
  );
}
