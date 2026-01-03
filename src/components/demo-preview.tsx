import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Pause, X, ChartBar, ShoppingCart, Calendar, Coins } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

interface DemoPreviewProps {
  onClose?: () => void;
  autoPlay?: boolean;
}

const DEMO_STEPS = [
  {
    title: 'Set Your Budget',
    description: 'Start by entering your weekly food budget and dietary preferences',
    icon: Coins,
    color: 'text-chart-1',
    bgColor: 'bg-chart-1/10',
    image: '💰',
  },
  {
    title: 'Personalize Your Plan',
    description: 'Choose your meal count, dietary restrictions, and nutrition goals',
    icon: Calendar,
    color: 'text-chart-2',
    bgColor: 'bg-chart-2/10',
    image: '🎯',
  },
  {
    title: 'AI Generates Your Meals',
    description: 'Get a complete meal plan with recipes, nutrition info, and exact costs',
    icon: ChartBar,
    color: 'text-chart-3',
    bgColor: 'bg-chart-3/10',
    image: '🤖',
  },
  {
    title: 'Smart Shopping List',
    description: 'One-click shopping list with aggregated ingredients and total cost',
    icon: ShoppingCart,
    color: 'text-chart-4',
    bgColor: 'bg-chart-4/10',
    image: '🛒',
  },
];

export function DemoPreview({ onClose, autoPlay = true }: DemoPreviewProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % DEMO_STEPS.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const currentStepData = DEMO_STEPS[currentStep];
  const Icon = currentStepData.icon;

  return (
    <div className="relative w-full">
      <Card className="relative overflow-hidden border-2 shadow-lg">
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-3 right-3 z-20 bg-background/80 backdrop-blur-sm hover:bg-background/90"
          >
            <X weight="bold" />
          </Button>
        )}

        <div className="relative aspect-video bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/5">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-12"
            >
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={cn(
                  'w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center mb-6',
                  currentStepData.bgColor
                )}
              >
                <span className="text-5xl md:text-6xl">{currentStepData.image}</span>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center space-y-3"
              >
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                  {currentStepData.title}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
                  {currentStepData.description}
                </p>
              </motion.div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className={cn(
                  'absolute bottom-8 w-16 h-16 rounded-full flex items-center justify-center',
                  currentStepData.bgColor
                )}
              >
                <Icon className={cn('w-8 h-8', currentStepData.color)} weight="duotone" />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent pt-8 pb-4 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-4 px-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsPlaying(!isPlaying)}
                className="rounded-full"
              >
                {isPlaying ? <Pause weight="fill" /> : <Play weight="fill" />}
              </Button>

              <div className="flex gap-2">
                {DEMO_STEPS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentStep(index);
                      setIsPlaying(false);
                    }}
                    className={cn(
                      'h-2 rounded-full transition-all duration-300',
                      index === currentStep
                        ? 'w-8 bg-primary'
                        : 'w-2 bg-muted hover:bg-muted-foreground/50'
                    )}
                    aria-label={`Go to step ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        {DEMO_STEPS.map((step, index) => {
          const StepIcon = step.icon;
          return (
            <button
              key={index}
              onClick={() => {
                setCurrentStep(index);
                setIsPlaying(false);
              }}
              className={cn(
                'group p-3 rounded-lg border-2 transition-all duration-200 text-left hover:shadow-md',
                index === currentStep
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-card hover:border-primary/50'
              )}
            >
              <div className="flex items-start gap-2">
                <div
                  className={cn(
                    'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                    step.bgColor
                  )}
                >
                  <StepIcon
                    className={cn('w-4 h-4', step.color)}
                    weight={index === currentStep ? 'fill' : 'regular'}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-foreground truncate">
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                    {step.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
