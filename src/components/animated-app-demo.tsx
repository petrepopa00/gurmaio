import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Pause, ArrowRight, Check } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

interface AnimatedAppDemoProps {
  className?: string;
}

const ANIMATION_SCENES = [
  {
    id: 'budget',
    duration: 3000,
    title: 'Set Your Budget',
    subtitle: 'Enter your weekly or daily food budget',
    render: () => (
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Weekly Budget</div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-3"
          >
            <div className="text-5xl font-bold text-primary tabular-nums">€50</div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            >
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <Check className="w-6 h-6 text-accent-foreground" weight="bold" />
              </div>
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          className="relative h-3 bg-muted rounded-full overflow-hidden"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '75%' }}
            transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent rounded-full"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-xs text-muted-foreground"
        >
          💡 Budget adjusts meal recommendations automatically
        </motion.div>
      </div>
    ),
  },
  {
    id: 'preferences',
    duration: 3000,
    title: 'Choose Preferences',
    subtitle: 'Select dietary restrictions and cuisine styles',
    render: () => (
      <div className="space-y-3">
        {[
          { name: 'Vegetarian', emoji: '🥬' },
          { name: 'Gluten-Free', emoji: '🌾' },
          { name: 'High Protein', emoji: '💪' },
        ].map((pref, i) => (
          <motion.div
            key={pref.name}
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.25, type: 'spring', stiffness: 100 }}
            className="flex items-center gap-3 p-4 bg-secondary/40 hover:bg-secondary/60 rounded-xl border border-border/50 transition-colors"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.25 + 0.3, type: 'spring', stiffness: 200 }}
              className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0"
            >
              <Check className="w-4 h-4 text-primary-foreground" weight="bold" />
            </motion.div>
            <span className="text-xl mr-2">{pref.emoji}</span>
            <span className="text-sm font-semibold">{pref.name}</span>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-xs text-muted-foreground text-center pt-2"
        >
          ✨ AI learns your taste preferences over time
        </motion.div>
      </div>
    ),
  },
  {
    id: 'generate',
    duration: 2500,
    title: 'AI Generates Plan',
    subtitle: 'Smart meal selection with nutrition calculation',
    render: () => (
      <div className="space-y-6">
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="w-20 h-20 mx-auto"
        >
          <div className="w-full h-full rounded-full border-4 border-primary/20 border-t-primary shadow-lg" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center space-y-2"
        >
          <div className="text-base font-semibold text-foreground">Generating your meals...</div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-sm text-muted-foreground"
          >
            🤖 Calculating nutrition & costs
          </motion.div>
        </motion.div>
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-2 h-2 rounded-full bg-primary"
            />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'mealplan',
    duration: 3500,
    title: 'Your Meal Plan',
    subtitle: 'Complete meals with exact costs and nutrition',
    render: () => (
      <div className="space-y-3">
        {[
          { name: 'Greek Yogurt Bowl', cal: '420', cost: '€3.20', emoji: '🥣' },
          { name: 'Chickpea Curry', cal: '580', cost: '€4.50', emoji: '🍛' },
          { name: 'Quinoa Salad', cal: '380', cost: '€3.80', emoji: '🥗' },
        ].map((meal, i) => (
          <motion.div
            key={meal.name}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.2, type: 'spring', stiffness: 100 }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between p-4 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 flex-1">
              <span className="text-2xl">{meal.emoji}</span>
              <div>
                <div className="text-sm font-semibold">{meal.name}</div>
                <div className="text-xs text-muted-foreground tabular-nums">{meal.cal} cal</div>
              </div>
            </div>
            <div className="text-base font-bold text-primary tabular-nums">{meal.cost}</div>
          </motion.div>
        ))}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, type: 'spring', stiffness: 100 }}
          className="flex items-center justify-between p-4 bg-gradient-to-r from-accent/10 to-primary/10 border-2 border-accent/50 rounded-xl shadow-sm"
        >
          <div className="text-sm font-bold">Daily Total</div>
          <div className="flex items-center gap-2">
            <div className="text-xs text-muted-foreground">1,380 cal</div>
            <div className="text-lg font-bold text-accent tabular-nums">€11.50</div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-xs text-muted-foreground text-center pt-1"
        >
          🛒 One-click shopping list included
        </motion.div>
      </div>
    ),
  },
];

export function AnimatedAppDemo({ className }: AnimatedAppDemoProps) {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const scene = ANIMATION_SCENES[currentScene];
    const timer = setTimeout(() => {
      setCurrentScene((prev) => (prev + 1) % ANIMATION_SCENES.length);
    }, scene.duration);

    return () => clearTimeout(timer);
  }, [currentScene, isPlaying]);

  const scene = ANIMATION_SCENES[currentScene];
  const progress = ((currentScene + 1) / ANIMATION_SCENES.length) * 100;

  return (
    <Card className={cn('overflow-hidden border-2 shadow-lg', className)}>
      <div className="p-6 md:p-8 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <div className="text-xs font-bold text-primary uppercase tracking-wider">
                Step {currentScene + 1} of {ANIMATION_SCENES.length}
              </div>
              <div className="h-1 w-12 bg-primary/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              {scene.title}
            </h3>
            <p className="text-sm text-muted-foreground">{scene.subtitle}</p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsPlaying(!isPlaying)}
            className="rounded-full shrink-0 ml-4"
          >
            {isPlaying ? <Pause weight="fill" /> : <Play weight="fill" />}
          </Button>
        </div>

        <div className="min-h-[280px] md:min-h-[320px] flex items-center justify-center px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={scene.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md"
            >
              {scene.render()}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-2">
            {ANIMATION_SCENES.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentScene(index);
                  setIsPlaying(false);
                }}
                className={cn(
                  'h-2 flex-1 rounded-full transition-all duration-300',
                  index === currentScene
                    ? 'bg-primary shadow-sm'
                    : index < currentScene
                    ? 'bg-primary/50'
                    : 'bg-muted hover:bg-muted-foreground/30'
                )}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                const prev = currentScene === 0 ? ANIMATION_SCENES.length - 1 : currentScene - 1;
                setCurrentScene(prev);
                setIsPlaying(false);
              }}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              ← Previous
            </button>
            <span className="text-xs text-muted-foreground font-medium">
              See how Gurmaio works
            </span>
            <button
              onClick={() => {
                setCurrentScene((prev) => (prev + 1) % ANIMATION_SCENES.length);
                setIsPlaying(false);
              }}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
