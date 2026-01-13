import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Warning, CheckCircle, EnvelopeSimple } from '@phosphor-icons/react';
import { useAuth } from '@/contexts/AuthContext';

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    setError('');
    setSuccess(false);

    if (!email || !password) {
      setError('Please enter your email and password');
      return;
    }

    setIsLoggingIn(true);
    try {
      const { error: signInError } = await signIn(email, password);
      if (signInError) {
        setError(signInError.message || 'Failed to log in. Please try again.');
        setIsLoggingIn(false);
        return;
      }

      setSuccess(true);
      setIsLoggingIn(false);

      setTimeout(() => {
        onOpenChange(false);
      }, 700);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to log in. Please try again.';
      setError(message);
      setIsLoggingIn(false);
    }
  };

  const handleClose = () => {
    if (isLoggingIn) return;
    setEmail('');
    setPassword('');
    setError('');
    setSuccess(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <EnvelopeSimple size={24} className="text-primary" />
            Log in
          </DialogTitle>
          <DialogDescription>Log in to access your saved meal plans and preferences</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {error && (
            <Alert variant="destructive">
              <Warning className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-accent/10 border-accent text-accent-foreground">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>Logged in successfully!</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="login-email">Email Address</Label>
            <Input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoggingIn || success}
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="login-password">Password</Label>
            <Input
              id="login-password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoggingIn || success}
              autoComplete="current-password"
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleClose} disabled={isLoggingIn || success}>
            Cancel
          </Button>
          <Button onClick={handleLogin} disabled={isLoggingIn || success}>
            {isLoggingIn ? 'Logging in...' : 'Log in'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
