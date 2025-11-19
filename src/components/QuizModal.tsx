import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Brain, CheckCircle2, XCircle } from 'lucide-react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizModalProps {
  open: boolean;
  onClose: () => void;
  quiz: QuizQuestion;
  onAnswer: (correct: boolean) => void;
}

export function QuizModal({ open, onClose, quiz, onAnswer }: QuizModalProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    const correct = parseInt(selectedAnswer) === quiz.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    onAnswer(correct);
  };

  const handleClose = () => {
    setSelectedAnswer('');
    setShowResult(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <div className="bg-gradient-to-br from-purple-50 to-indigo-100 -m-6 mb-4 p-6 rounded-t-lg">
          <div className="flex justify-center mb-4">
            <Brain className="w-12 h-12 text-purple-600" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Investment Knowledge Quiz</DialogTitle>
            <DialogDescription className="text-center">
              Answer correctly to earn bonus returns!
            </DialogDescription>
          </DialogHeader>
        </div>

        {!showResult ? (
          <>
            <div className="py-4">
              <h3 className="mb-4">{quiz.question}</h3>
              <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                {quiz.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <DialogFooter>
              <Button onClick={handleClose} variant="outline">Skip</Button>
              <Button onClick={handleSubmit} disabled={!selectedAnswer}>
                Submit Answer
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <div className={`p-6 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
              <div className="flex items-center gap-3 mb-4">
                {isCorrect ? (
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-600" />
                )}
                <h3 className={isCorrect ? 'text-green-700' : 'text-red-700'}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </h3>
              </div>
              <p className="text-sm text-gray-700">{quiz.explanation}</p>
              {isCorrect && (
                <p className="text-sm mt-3 p-3 bg-white rounded border-l-4 border-green-500">
                  🎉 Bonus: +5% on your next dividend payment!
                </p>
              )}
            </div>

            <DialogFooter>
              <Button onClick={handleClose} className="w-full">
                Continue Game
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
