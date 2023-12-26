import React from 'react';
import './Timer.css';

const Timer = ({ duration, timeElapsed }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;

    // Calculate the strokeDashoffset
    const strokeDashoffset = circumference - (timeElapsed / duration) * circumference;

    // Format time
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    return (
        <div className="timer">
            <svg className="timer-svg" width="100" height="100">
                <circle className="timer-circle-bg" cx="50" cy="50" r={radius} fill="black" />
                <circle
                    className="timer-circle"
                    cx="50" cy="50" r={radius}
                    fill="transparent"
                    stroke="cyan"
                    strokeWidth="5"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    transform="rotate(-90 50 50)"
                />
            </svg>
            <span className="timer-text">
                {formatTime(timeElapsed)}
            </span>
        </div>
    );
};

export default Timer;
