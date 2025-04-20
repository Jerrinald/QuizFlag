import React, { useState } from 'react';
import QuizzForm from './QuizzForm';

function CardQuizz({ svgCountry, iso, onCorrectAnswer, onIncrementScore, timer }) {
    const [isCorrect, setIsCorrect] = useState(null); // State to handle the correctness
    const [showCorrectMessage, setShowCorrectMessage] = useState(false);
    const [showCorrectName, setShowCorrectName] = useState('');
    const [isSkippedFlag, setIsSkippedFlag] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    

    const handleAnswerCheck = (correct, correctName, isSkipped) => {

        if (isSkipped) {
            
            setIsSkippedFlag(isSkipped);
            setShowCorrectName(correctName)
            setShowCorrectMessage(true);
            setTimeout(() => {
                setShowCorrectMessage(false);
                onCorrectAnswer();
                
            }, 1200); // Show "Correct!" message for 1 second
        } else {
            setIsCorrect(correct);
            setShowCorrectMessage(true);
            setTimeout(() => {
                setShowCorrectMessage(false);
                if (correct) {
                    onIncrementScore();
                    onCorrectAnswer();
                }
                
            }, 1200); // Show "Correct!" message for 1 second
        }
        
    };

    return (
        <div className="mt-2 w-full flex flex-col items-center">
            <div className="flex items-center justify-center flex-col mb-6 gap-1 w-3/4">
                <span className={`${isSkippedFlag ? 'text-black' : isCorrect ? 'text-green-600' : 'text-red-600'} text-xl font-semibold transition-opacity duration-300 ${showCorrectMessage ? 'opacity-100' : 'opacity-0'}`}>
                    {isSkippedFlag 
                        ? `💡 La réponse est : ${showCorrectName}`
                        : isCorrect === false 
                        ? '❌ Incorrecte !' 
                        : '✅ Correcte !'}
                </span>

                <img 
                    className="w-3/4 aspect-[4/3] object-contain border-4 border-gray-300 rounded-lg shadow-lg p-4 bg-gray-100" 
                    src={svgCountry} 
                    alt="Country flag"
                />
            </div>
            <QuizzForm iso={iso} onAnswerCheck={handleAnswerCheck} />
        </div>
    );
}

export default CardQuizz;