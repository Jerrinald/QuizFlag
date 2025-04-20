import React, { useState, useEffect } from 'react';

function CounterStart({ onFinish }) {
    const [counter, setCounter] = useState(3);
    const [showGo, setShowGo] = useState(false);

    useEffect(() => {
        if (counter > 0) {
            const timer = setTimeout(() => {
                setCounter(counter - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            setShowGo(true); // Show "Go!" for 1 second
            const goTimer = setTimeout(() => {
                setShowGo(false);
                onFinish(); // Start the quiz after "Go!"
            }, 1000);
            return () => clearTimeout(goTimer);
        }
    }, [counter, onFinish]);

    return (
        <span className="text-9xl font-bold text-white">
            {counter > 0 ? counter : "Go !"}
        </span>
    );
}

export default CounterStart;
