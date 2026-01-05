import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { WarningCircle } from '@phosphor-icons/react';

interface AgeGateDialogProps {
  open: boolean;
  onAgeVerified: () => void;
  onReject: () => void;
}

export function AgeGateDialog({ open, onAgeVerified, onReject }: AgeGateDialogProps) {
  const [birthYear, setBirthYear] = useState('');
  const [error, setError] = useState('');

  const handleVerify = () => {
    const year = parseInt(birthYear, 10);
    const currentYear = new Date().getFullYear();
    
    if (!year || isNaN(year)) {
      setError('Please enter a valid year');
      return;
    }

    if (year < 1900 || year > currentYear) {
      setError('Please enter a valid birth year');
      return;
    }

    const age = currentYear - year;

    if (age < 13) {
      onReject();
    } else {
      onAgeVerified();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleVerify();
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-2xl">🎂</span>
            Age Verification Required
          </DialogTitle>
          <DialogDescription>
            To use Gurmaio, you must be at least 13 years old. Please verify your age to continue.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="birth-year">What year were you born?</Label>
            <Input
              id="birth-year"
              type="number"
              placeholder="e.g., 1990"
              value={birthYear}
              onChange={(e) => {
                setBirthYear(e.target.value);
                setError('');
              }}
              onKeyDown={handleKeyDown}
              min="1900"
              max={new Date().getFullYear()}
              autoFocus
              aria-label="Birth year"
              aria-describedby={error ? "birth-year-error" : undefined}
              aria-invalid={!!error}
            />
            {error && (
              <p id="birth-year-error" className="text-sm text-destructive flex items-center gap-1" role="alert">
                <WarningCircle size={14} />
                {error}
              </p>
            )}
          </div>

          <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground">
            <p className="font-medium mb-1">Why do we ask?</p>
            <p>
              This app is not intended for children under 13 years old, in compliance with COPPA (Children's Online Privacy Protection Act).
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleVerify} className="w-full">
            Verify Age
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function AgeRejectionDialog({ open }: { open: boolean }) {
  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-2xl">⚠️</span>
            Age Requirement Not Met
          </DialogTitle>
          <DialogDescription>
            We're sorry, but you must be at least 13 years old to use Gurmaio.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-muted/50 rounded-lg p-4 text-sm">
            <p className="mb-2">
              Gurmaio is not designed for children under 13 years old, in compliance with:
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground">
              <li>COPPA (Children's Online Privacy Protection Act)</li>
              <li>iOS App Store Guidelines</li>
              <li>Google Play Store Policies</li>
            </ul>
          </div>

          <p className="text-sm text-center text-muted-foreground">
            If you believe this is an error, please contact our support team at <strong>support@gurmaio.app</strong>
          </p>
        </div>

        <DialogFooter>
          <Button 
            onClick={() => window.location.href = 'about:blank'} 
            variant="outline"
            className="w-full"
          >
            Exit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
