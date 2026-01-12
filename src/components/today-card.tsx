import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import type { ScheduledDay } from '@/types/domain';

interface TodayCardProps {
  todayScheduled: ScheduledDay | null;
  currentDate: string;
  t: any;
}

export function TodayCard({ todayScheduled, currentDate, t }: TodayCardProps) {
  if (!todayScheduled) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="border-2 border-muted bg-muted/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                <div>
                  <h3 className="font-heading font-semibold text-sm">
                    {t.todayCardTitle} ({new Date(currentDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })})
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t.noDayScheduledToday}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const completedMeals = todayScheduled.is_completed ? todayScheduled.meals_count : 0;
  const totalMeals = todayScheduled.meals_count;
  const progress = (completedMeals / totalMeals) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-2 border-accent bg-accent/5 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <motion.div 
                className="w-2 h-2 rounded-full bg-accent"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-heading font-semibold text-sm">
                    {t.todayCardTitle} ({new Date(currentDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })})
                  </h3>
                  {todayScheduled.is_completed && (
                    <Badge variant="default" className="text-xs px-2 py-0">
                      {t.completed}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    {todayScheduled.is_completed ? (
                      <CheckCircle weight="fill" size={14} className="text-accent" />
                    ) : (
                      <Circle size={14} />
                    )}
                    <span>
                      {completedMeals}/{totalMeals} {t.mealsCompleted}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">€{todayScheduled.total_cost.toFixed(2)}</span> {t.budgetToday}
                  </div>
                  <div>
                    <span className="font-medium">{Math.round(todayScheduled.total_nutrition.calories)}</span> {t.caloriesUnit}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {!todayScheduled.is_completed && (
            <div className="mt-3">
              <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                <motion.div
                  className="h-full bg-accent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
