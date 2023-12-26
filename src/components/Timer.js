import React, { useState, useEffect } from 'react';
import './Timer.css';

const Timer = ({ duration, startDelay, isRunning }) => {
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [timerActive, setTimerActive] = useState(false);
    let interval = null;
    const radius = 45;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
        if (isRunning && !timerActive) {
            setTimeout(() => {
                setTimerActive(true);
                interval = setInterval(() => {
                    setTimeElapsed((prevTime) => prevTime + 1);
                }, 1000);
            }, startDelay * 1000);
        }

        // Clearing the interval when component unmounts or timer is stopped
        return () => {
            if (interval) {
                clearInterval(interval);
            }
            setTimerActive(false);
        };
    }, [isRunning, startDelay]);

    useEffect(() => {
        if (timeElapsed >= duration) {
            if (interval) {
                clearInterval(interval);
            }
            setTimerActive(false);
            setTimeElapsed(duration);
        }
    }, [timeElapsed, duration]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    const strokeDashoffset = () => {
        // Calculate the offset based on the time elapsed
        return circumference - (timeElapsed / duration) * circumference;
    };

    return (
        <div className="timer">
            <svg className="timer-svg" width="100" height="100">
                <circle className="timer-circle-bg" cx="50" cy="50" r="45" />
                <circle
                    className="timer-circle"
                    cx="50" cy="50" r="45"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset()}
                />
            </svg>
            <span className="timer-text">
                {formatTime(timeElapsed)}
            </span>
        </div>
    );
};

export default Timer;