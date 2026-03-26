import { useEffect, useState } from 'react';
import { playSound } from '../../../utils/sounds';

function Timer({ initialTime, onTimeUp }) {
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [finalTime, setFinalTime] = useState(false);

    const FINAL_TIME = 8;

    useEffect(() => {
        if (timeLeft <= 0) {
            onTimeUp();
            return;
        }

        if (timeLeft === FINAL_TIME) {
            playSound('timeTicking');
            setFinalTime(true);
        }

        const timerId = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft, onTimeUp]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <span className={`text-xl ${finalTime ? 'animate-pulse text-red-600' : 'text-blue-600'}`}>
            Temps restant: {minutes > 0 ? `${minutes}min ` : ''}{seconds}s
        </span>
    );
}

export default Timer;
