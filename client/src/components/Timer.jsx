import React, { useState, useEffect } from 'react';

function Timer({ initialTime, onTimeUp }) {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        if (timeLeft <= 0) {
            onTimeUp();
            return;
        }

        const timerId = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerId); // Cleanup on unmount
    }, [timeLeft, onTimeUp]);

    // Convert seconds to minutes and seconds
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <span className="text-blue-600 text-xl">
            Temps restant: {minutes > 0 ? `${minutes}min ` : ''}{seconds}s
        </span>
    );
}

export default Timer;
