import { playSound } from '@/utils/sounds';
import { useState } from 'react';
import QuizForm from './QuizForm';

function QuizCard({ strategy, country, onCorrectAnswer, onIncrementScore }) {
  const [isCorrect, setIsCorrect] = useState(null);
  const [showCorrectMessage, setShowCorrectMessage] = useState(false);
  const [showCorrectName, setShowCorrectName] = useState('');
  const [isSkipped, setIsSkipped] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const handleAnswerCheck = (correct, correctName, skipped) => {
    setWaiting(true);
    setShowCorrectMessage(true);

    if (skipped) {
      playSound('skip');
      setIsSkipped(true);
      setShowCorrectName(correctName);
      setTimeout(() => {
        setShowCorrectMessage(false);
        setWaiting(false);
        onCorrectAnswer();
      }, 1200);
    } else {
      playSound(correct ? 'correct' : 'incorrect');
      setIsCorrect(correct);
      setTimeout(() => {
        setShowCorrectMessage(false);
        setWaiting(false);
        if (correct) {
          onIncrementScore();
          onCorrectAnswer();
        }
      }, 1200);
    }
  };

  return (
    <div className="mt-2 w-full flex flex-col items-center">
      <div className="flex items-center justify-center flex-col mb-6 gap-1 w-5/6 sm:w-2/4 lg:w-3/4">
        <span
          className={`${isSkipped ? 'text-black' : isCorrect ? 'text-green-600' : 'text-red-600'} text-xl font-semibold transition-opacity duration-300 ${showCorrectMessage ? 'visible' : 'invisible'}`}
        >
          {isSkipped
            ? `La reponse est : ${showCorrectName}`
            : isCorrect === false
              ? 'Incorrecte !'
              : 'Correcte !'}
        </span>

        {strategy.renderQuestion(country)}
      </div>
      <QuizForm
        iso={country.cca2}
        skipLabel={strategy.skipLabel}
        onAnswerCheck={handleAnswerCheck}
        disabled={waiting}
      />
    </div>
  );
}

export default QuizCard;
