import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { CopySimple, CalendarCheck, ArrowRight } from '@phosphor-icons/react';
import { format, addWeeks, startOfWeek, endOfWeek, parseISO } from 'date-fns';
import type { DayProgress } from '@/types/domain';
import { cn } from '@/lib/utils';

interface CopyWeekDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  completedDays: DayProgress[];
  onCopyWeek: (sourceDates: string[], targetStartDate: string) => void;
}

export function CopyWeekDialog({ open, onOpenChange, completedDays, onCopyWeek }: CopyWeekDialogProps) {
  const [selectedSourceWeek, setSelectedSourceWeek] = useState<string | null>(null);
  const [selectedTargetDate, setSelectedTargetDate] = useState<Date | undefined>(undefined);
  const [step, setStep] = useState<'select-source' | 'select-target'>('select-source');

  const getWeeksWithCompletedDays = (): Map<string, DayProgress[]> => {
    const weekMap = new Map<string, DayProgress[]>();
    
    completedDays.forEach(day => {
      const date = parseISO(day.date);
      const weekStart = startOfWeek(date, { weekStartsOn: 1 });
      const weekKey = format(weekStart, 'yyyy-MM-dd');
      
      if (!weekMap.has(weekKey)) {
        weekMap.set(weekKey, []);
      }
      weekMap.get(weekKey)!.push(day);
    });
    
    return weekMap;
  };

  const weeks = Array.from(getWeeksWithCompletedDays().entries())
    .map(([weekStart, days]) => ({
      weekStart,
      days: days.sort((a, b) => a.date.localeCompare(b.date)),
      count: days.length
    }))
    .sort((a, b) => b.weekStart.localeCompare(a.weekStart));

  const handleSourceWeekSelect = (weekStart: string) => {
    setSelectedSourceWeek(weekStart);
    setStep('select-target');
  };

  const handleBack = () => {
    setStep('select-source');
    setSelectedTargetDate(undefined);
  };

  const handleCopy = () => {
    if (!selectedSourceWeek || !selectedTargetDate) return;
    
    const sourceWeek = weeks.find(w => w.weekStart === selectedSourceWeek);
    if (!sourceWeek) return;
    
    const sourceDates = sourceWeek.days.map(d => d.date);
    const targetStartDateStr = format(selectedTargetDate, 'yyyy-MM-dd');
    
    onCopyWeek(sourceDates, targetStartDateStr);
    handleClose();
  };

  const handleClose = () => {
    setSelectedSourceWeek(null);
    setSelectedTargetDate(undefined);
    setStep('select-source');
    onOpenChange(false);
  };

  const getUsedDates = (): Set<string> => {
    return new Set(completedDays.map(d => d.date));
  };

  const isDateDisabled = (date: Date): boolean => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const usedDates = getUsedDates();
    
    if (usedDates.has(dateStr)) return true;
    
    if (!selectedSourceWeek) return false;
    
    const sourceWeek = weeks.find(w => w.weekStart === selectedSourceWeek);
    if (!sourceWeek) return false;
    
    for (let i = 0; i < sourceWeek.count; i++) {
      const checkDate = new Date(date);
      checkDate.setDate(checkDate.getDate() + i);
      const checkDateStr = format(checkDate, 'yyyy-MM-dd');
      if (usedDates.has(checkDateStr)) {
        return true;
      }
    }
    
    return false;
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CopySimple size={24} />
            Copy Week Schedule
          </DialogTitle>
          <DialogDescription>
            {step === 'select-source' 
              ? 'Select a week with completed days to copy' 
              : 'Choose the start date for the copied week'}
          </DialogDescription>
        </DialogHeader>

        {step === 'select-source' ? (
          <div className="space-y-4">
            {weeks.length === 0 ? (
              <div className="text-center py-12">
                <CalendarCheck size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">No completed weeks to copy</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Complete some days first, then you can copy them to other weeks
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {weeks.map(week => {
                  const weekStartDate = parseISO(week.weekStart);
                  const weekEndDate = endOfWeek(weekStartDate, { weekStartsOn: 1 });
                  
                  return (
                    <Card
                      key={week.weekStart}
                      className={cn(
                        'p-4 cursor-pointer transition-all hover:shadow-md hover:border-primary',
                        selectedSourceWeek === week.weekStart && 'border-primary bg-primary/5'
                      )}
                      onClick={() => handleSourceWeekSelect(week.weekStart)}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold">
                              {format(weekStartDate, 'MMM d')} - {format(weekEndDate, 'MMM d, yyyy')}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {week.count} day{week.count !== 1 ? 's' : ''} completed
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <CalendarCheck size={20} className="text-primary" />
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          {week.days.map(day => (
                            <div
                              key={day.date}
                              className="flex items-center justify-between text-xs bg-muted/50 rounded px-2 py-1"
                            >
                              <span>
                                {format(parseISO(day.date), 'EEE, MMM d')}
                              </span>
                              <span className="text-muted-foreground">
                                {Math.round(day.total_nutrition.calories)} cal
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
              <p className="text-sm font-medium flex items-center gap-2">
                <CalendarCheck size={16} />
                Copying {weeks.find(w => w.weekStart === selectedSourceWeek)?.count} days
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                from {format(parseISO(selectedSourceWeek!), 'MMM d, yyyy')}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium mb-3">Select the first day for the new schedule:</p>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedTargetDate}
                  onSelect={setSelectedTargetDate}
                  disabled={isDateDisabled}
                  className="rounded-md border"
                />
              </div>
            </div>

            {selectedTargetDate && (
              <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
                <p className="text-sm font-medium flex items-center gap-2">
                  <ArrowRight size={16} />
                  New schedule preview:
                </p>
                <div className="mt-2 space-y-1">
                  {weeks
                    .find(w => w.weekStart === selectedSourceWeek)
                    ?.days.map((day, index) => {
                      const newDate = new Date(selectedTargetDate);
                      newDate.setDate(newDate.getDate() + index);
                      return (
                        <div
                          key={day.date}
                          className="flex items-center justify-between text-xs bg-background rounded px-2 py-1"
                        >
                          <span className="text-muted-foreground">
                            {format(parseISO(day.date), 'MMM d')}
                          </span>
                          <ArrowRight size={12} className="text-muted-foreground" />
                          <span className="font-medium">
                            {format(newDate, 'EEE, MMM d, yyyy')}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          {step === 'select-target' && (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          {step === 'select-target' && (
            <Button onClick={handleCopy} disabled={!selectedTargetDate}>
              <CopySimple className="mr-2" />
              Copy Week
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
