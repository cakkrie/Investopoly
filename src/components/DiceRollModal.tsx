import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { motion } from 'motion/react';
import { VisuallyHidden } from './ui/visually-hidden';

interface DiceRollModalProps {
  open: boolean;
  onClose: () => void;
  dice: [number, number];
}

export function DiceRollModal({ open, onClose, dice }: DiceRollModalProps) {
  const total = dice[0] + dice[1];
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <VisuallyHidden>
          <DialogTitle>Dice Roll Result</DialogTitle>
          <DialogDescription>
            You rolled {dice[0]} and {dice[1]} for a total of {total}
          </DialogDescription>
        </VisuallyHidden>
        
        <div className="flex flex-col items-center justify-center py-8">
          <h3 className="mb-8 text-slate-700">Rolling Dice...</h3>
          
          <div className="flex gap-6 mb-8">
            {dice.map((value, index) => (
              <motion.div
                key={index}
                className="w-24 h-24 bg-white rounded-xl shadow-2xl flex items-center justify-center border-2 border-slate-200"
                animate={{
                  rotateX: [0, 360, 720, 1080],
                  rotateY: [0, 360, 720, 1080],
                }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                }}
              >
                <span className="text-4xl text-slate-900">{value}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.3 }}
            className="text-center"
          >
            <p className="text-slate-600 mb-2">Total Roll</p>
            <p className="text-5xl text-slate-900">{total}</p>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}