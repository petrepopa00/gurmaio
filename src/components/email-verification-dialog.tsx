import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { EnvelopeSimple, CheckCircle, Warning, ArrowClockwise } from '@phosphor-icons/react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface EmailVerificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userEmail?: string;
  onVerificationComplete: () => void;
  requiresEmailEntry?: boolean;
}

export function EmailVerificationDialog({
  open,
  onOpenChange,
  userEmail,
  onVerificationComplete,
  requiresEmailEntry = false,
}: EmailVerificationDialogProps) {
  const { resendSignupConfirmationEmail } = useAuth();
  const [email, setEmail] = useState(userEmail || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return;
    setError('');
    setEmail(userEmail || '');
  }, [open, userEmail]);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleResendVerificationEmail = async () => {
    setError('');
    
    if (requiresEmailEntry && !email) {
      setError('Please enter your email address');
      return;
    }

    if (requiresEmailEntry && !isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await resendSignupConfirmationEmail(email, {
        emailRedirectTo: window.location.origin,
      });

      if (error) {
        setError(error.message || 'Failed to resend verification email. Please try again.');
        return;
      }

      toast.success(`Verification email sent to ${email}`);
    } catch (err) {
      setError('Failed to resend verification email. Please try again.');
      console.error('Verification resend error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshVerificationStatus = async () => {
    setError('');
    if (!supabase) {
      setError('Supabase not configured');
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        setError(error.message || 'Failed to refresh user. Please try again.');
        return;
      }

      const u: any = data?.user;
      const confirmed = Boolean(u?.email_confirmed_at || u?.confirmed_at);
      if (confirmed) {
        toast.success('Email verified!');
        onVerificationComplete();
        onOpenChange(false);
      } else {
        toast.message('Not verified yet', {
          description: 'Please click the confirmation link in your email, then try again.',
        });
      }
    } catch (err) {
      setError('Failed to refresh verification status. Please try again.');
      console.error('Verification refresh error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkipVerification = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10">
            <EnvelopeSimple size={24} className="text-primary" weight="duotone" />
          </div>
          <DialogTitle className="text-center">
            Verify Your Email
          </DialogTitle>
          <DialogDescription className="text-center">
            {requiresEmailEntry
              ? 'Enter your email address to receive a verification link'
              : `We'll send a verification link to ${email}`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {requiresEmailEntry && (
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                autoFocus
              />
            </div>
          )}

          <Alert>
            <CheckCircle size={16} className="text-primary" />
            <AlertDescription className="text-sm">
              Check your inbox (and spam). Click the verification link, then come back here and press “I already verified”.
            </AlertDescription>
          </Alert>

          {error && (
            <Alert variant="destructive">
              <Warning size={16} />
              <AlertDescription className="text-sm">{error}</AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-col gap-2">
          <Button
            onClick={handleResendVerificationEmail}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Sending...' : 'Resend Verification Email'}
          </Button>
          <Button
            variant="secondary"
            onClick={handleRefreshVerificationStatus}
            disabled={isLoading}
            className="w-full"
          >
            <ArrowClockwise className="mr-2" size={16} />
            I already verified
          </Button>
          <Button
            variant="ghost"
            onClick={handleSkipVerification}
            disabled={isLoading}
            className="w-full"
          >
            Skip for Now
          </Button>
        </DialogFooter>

        <div className="text-xs text-center text-muted-foreground mt-2">
          By verifying your email, you'll be able to save meal plans and recover your account
        </div>
      </DialogContent>
    </Dialog>
  );
}
