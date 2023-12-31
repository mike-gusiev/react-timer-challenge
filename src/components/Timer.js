import React from 'react';
import './Timer.css';

const Timer = ({ duration, timeElapsed }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;

    const strokeDashoffset = circumference - (timeElapsed / duration) * circumference;

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    return (
        <div className="timer-block">
            <div className="preset-time">
                {formatTime(duration)}
            </div>
            <div className="timer">
                <svg className="timer-svg" width="100" height="100">
                    <circle className="timer-circle-bg" cx="50" cy="50" r={radius} fill="black" />
                    <circle
                        data-testid="progress-circle"
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
        </div>
    );
};

export default Timer;
