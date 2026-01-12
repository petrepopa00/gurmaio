import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Bell, EnvelopeSimple } from '@phosphor-icons/react';
import { Badge } from '@/components/ui/badge';
import { useKV } from '@github/spark/hooks';
import { toast } from 'sonner';

interface ReminderSettingsCardProps {
  userEmail?: string;
  t: any;
}

export function ReminderSettingsCard({ userEmail, t }: ReminderSettingsCardProps) {
  const [emailRemindersEnabled, setEmailRemindersEnabled] = useKV<boolean>('email_reminders_enabled', false);

  const handleToggleEmailReminders = (enabled: boolean) => {
    setEmailRemindersEnabled(() => enabled);
    if (enabled) {
      toast.success(t.emailRemindersEnabled, {
        description: t.emailRemindersEnabledDescription
      });
    } else {
      toast.info(t.emailRemindersDisabled);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bell size={20} className="text-primary" />
          <CardTitle className="text-lg">{t.remindersTitle}</CardTitle>
        </div>
        <CardDescription>{t.remindersDescription}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
          <div className="flex items-start gap-3 flex-1">
            <EnvelopeSimple size={24} className="text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <Label htmlFor="email-reminders" className="font-medium text-sm">
                {t.emailRemindersLabel}
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                {t.emailRemindersHelp}
              </p>
              {userEmail && emailRemindersEnabled && (
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {userEmail}
                  </Badge>
                </div>
              )}
            </div>
          </div>
          <Switch
            id="email-reminders"
            checked={emailRemindersEnabled}
            onCheckedChange={handleToggleEmailReminders}
            disabled={!userEmail}
          />
        </div>

        {!userEmail && (
          <div className="text-xs text-muted-foreground bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
            <p className="font-medium text-amber-900 dark:text-amber-200 mb-1">
              {t.emailRequiredForReminders}
            </p>
            <p className="text-amber-700 dark:text-amber-300">
              {t.emailRequiredForRemindersDescription}
            </p>
          </div>
        )}

        {emailRemindersEnabled && (
          <div className="text-xs text-muted-foreground bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <p className="font-medium text-blue-900 dark:text-blue-200 mb-1">
              ✓ {t.remindersActiveTitle}
            </p>
            <p className="text-blue-700 dark:text-blue-300">
              {t.remindersActiveDescription}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
