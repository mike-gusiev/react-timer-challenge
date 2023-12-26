import React, { useState, useEffect } from 'react';
import Timer from './components/Timer';

import './App.css';

const App = () => {
    const [timers, setTimers] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    let interval;

    useEffect(() => {
        if (isRunning) {
            interval = setInterval(() => {
                setTimers(timers => timers.map(timer => {
                    const timeNow = Date.now();
                    if (timer.startTime <= timeNow) {
                        const newTimeElapsed = Math.min(timer.timeElapsed + 1, timer.duration);
                        return { ...timer, timeElapsed: newTimeElapsed };
                    }
                    return timer;
                }));
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    const addTimer = () => {
        const duration = parseInt(prompt("Enter duration in seconds:", "60"), 10);
        if (!isNaN(duration)) {
            setTimers([...timers, { duration, id: Date.now(), timeElapsed: 0, startTime: 0 }]);
        }
    };

    const startTimers = () => {
        const maxDuration = Math.max(...timers.map(timer => timer.duration));
        const startTime = Date.now();

        setTimers(timers.map(timer => ({
            ...timer,
            startTime: startTime + (maxDuration - timer.duration) * 1000,
            timeElapsed: 0
        })));

        setIsRunning(true);
    };

    const pauseResumeTimers = () => {
        if (!isRunning) {
            // Find the maximum remaining time among all timers
            const maxRemainingTime = Math.max(...timers.map(timer => timer.duration - timer.timeElapsed));
            const currentTime = Date.now();

            setTimers(timers.map(timer => {
                // Calculate the new startTime for each timer
                const newStartTime = currentTime - (timer.duration - maxRemainingTime) * 1000;
                return { ...timer, startTime: newStartTime };
            }));
        }
        setIsRunning(!isRunning);
    };

    const resetTimers = () => {
        setTimers([]);
        setIsRunning(false);
    };

    return (
        <div className="app">
            <div className="timer-controls">
                <button onClick={addTimer}>Add New</button>
                <button onClick={startTimers}>Start</button>
                <button onClick={pauseResumeTimers}>{isRunning ? 'Pause' : 'Resume'}</button>
                <button onClick={resetTimers}>Reset</button>
            </div>
            <div className="timer-container">
                {timers.map(timer => (
                    <Timer
                        key={timer.id}
                        duration={timer.duration}
                        timeElapsed={timer.timeElapsed}
                    />
                ))}
            </div>
        </div>
    );
};

export default App;
