import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy, Confetti } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

interface FirstSuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  t: any;
}

export function FirstSuccessDialog({ open, onOpenChange, t }: FirstSuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 15 
            }}
            className="relative"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 10, 0],
              }}
              transition={{ 
                duration: 0.5,
                repeat: 2,
                repeatDelay: 0.3
              }}
            >
              <Trophy size={80} weight="fill" className="text-accent" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute -top-2 -right-2"
            >
              <Confetti size={32} weight="fill" className="text-primary" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center space-y-2"
          >
            <h3 className="font-heading text-2xl font-bold text-foreground">
              {t.firstSuccessTitle}
            </h3>
            <p className="text-muted-foreground text-sm max-w-sm">
              {t.firstSuccessMessage}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="w-full"
          >
            <Button
              onClick={() => onOpenChange(false)}
              className="w-full"
              size="lg"
            >
              {t.continue}
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
