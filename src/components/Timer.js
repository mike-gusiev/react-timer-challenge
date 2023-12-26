import React, { useState, useEffect } from 'react';
import './Timer.css';

const Timer = ({ maxTime }) => {
    const [time, setTime] = useState(0);
    const radius = 45; // Radius of the SVG circle
    const circumference = 2 * Math.PI * radius; // Circumference of the circle

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prevTime => (prevTime < maxTime ? prevTime + 1 : maxTime));
        }, 1000);

        return () => clearInterval(interval);
    }, [maxTime]);

    // Calculate the stroke dash offset based on the timer
    const strokeDashoffset = circumference - (time / maxTime) * circumference;

    return (
        <div className="timer">
            <svg className="timer-svg" width="100" height="100">
                <circle
                    className="timer-circle-bg"
                    cx="50" cy="50" r={radius}
                    fill="black" />
                <circle
                    className="timer-circle"
                    cx="50" cy="50" r={radius}
                    fill="transparent"
                    stroke="cyan"
                    strokeWidth="3"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    transform="rotate(-90 50 50)"
                />
            </svg>
            <span className="timer-text">
        {new Date(time * 1000).toISOString().substr(14, 5)}
      </span>
        </div>
    );
};

export default Timer;