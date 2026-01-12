import { Warning, CheckCircle, ArrowSquareOut } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getSupabaseStatus } from '@/lib/supabase';

export function SupabaseConfigCheck() {
  const status = getSupabaseStatus();

  if (status.configured) {
    return null;
  }

  return (
    <Alert variant="destructive" className="mb-6">
      <Warning className="h-4 w-4" />
      <AlertTitle>Supabase Configuration Required</AlertTitle>
      <AlertDescription className="mt-2 space-y-3">
        <p>
          The application needs Supabase credentials to persist data. Please configure the following environment variables:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <code className="bg-muted px-1 py-0.5 rounded">VITE_SUPABASE_URL</code>
            {status.hasUrl ? ' ✓' : ' ✗'}
          </li>
          <li>
            <code className="bg-muted px-1 py-0.5 rounded">VITE_SUPABASE_ANON_KEY</code>
            {status.hasAnonKey ? ' ✓' : ' ✗'}
          </li>
        </ul>
        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open('/SUPABASE_ENV_SETUP.md', '_blank')}
          >
            <ArrowSquareOut className="mr-2 h-4 w-4" />
            Setup Guide
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open('https://app.supabase.com', '_blank')}
          >
            <ArrowSquareOut className="mr-2 h-4 w-4" />
            Supabase Dashboard
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Without Supabase configured, the app will not be able to persist data between sessions.
        </p>
      </AlertDescription>
    </Alert>
  );
}

export function SupabaseConfigSuccess() {
  const status = getSupabaseStatus();

  if (!status.configured) {
    return null;
  }

  return (
    <Alert className="mb-6 border-green-500/50 text-green-700 dark:text-green-400">
      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
      <AlertTitle>Supabase Connected</AlertTitle>
      <AlertDescription>
        Data persistence is active. Your meal plans and preferences will be saved.
      </AlertDescription>
    </Alert>
  );
}