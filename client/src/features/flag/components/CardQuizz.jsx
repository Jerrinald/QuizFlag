import { playSound } from '@/utils/sounds';
import { useState } from 'react';
import QuizzForm from './QuizzForm';

function CardQuizz({ svgCountry, iso, onCorrectAnswer, onIncrementScore }) {
    const [isCorrect, setIsCorrect] = useState(null);
    const [showCorrectMessage, setShowCorrectMessage] = useState(false);
    const [showCorrectName, setShowCorrectName] = useState('');
    const [isSkippedFlag, setIsSkippedFlag] = useState(false);
    const [waiting, setWaiting] = useState(false);


    const handleAnswerCheck = (correct, correctName, isSkipped) => {
        setWaiting(true);
        setShowCorrectMessage(true);
        if (isSkipped) {
            playSound('skip');
            setIsSkippedFlag(isSkipped);
            setShowCorrectName(correctName)
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
                <span className={`${isSkippedFlag ? 'text-black' : isCorrect ? 'text-green-600' : 'text-red-600'} text-xl font-semibold transition-opacity duration-300 ${showCorrectMessage ? 'visible' : 'invisible'}`}>
                    {isSkippedFlag
                        ? `La reponse est : ${showCorrectName}`
                        : isCorrect === false
                        ? 'Incorrecte !'
                        : 'Correcte !'}
                </span>

                <img
                    className="lg:w-3/4 aspect-[4/3] object-contain border-4 border-gray-300 rounded-lg shadow-lg p-4 bg-gray-100"
                    src={svgCountry}
                    alt="Country flag"
                />
            </div>
            <QuizzForm iso={iso} onAnswerCheck={handleAnswerCheck} disabled={waiting} />
        </div>
    );
}

export default CardQuizz;
