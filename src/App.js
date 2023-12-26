import React, { useState, useEffect } from 'react';
import Timer from './components/Timer';

import './App.css';

const App = () => {
    const [timers, setTimers] = useState([]);
    const [maxDuration, setMaxDuration] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    // Load state from localStorage
    useEffect(() => {
        const savedTimers = JSON.parse(localStorage.getItem('timers'));
        if (savedTimers) {
            setTimers(savedTimers);
        }
    }, []);

    // Save state to localStorage
    useEffect(() => {
        localStorage.setItem('timers', JSON.stringify(timers));
    }, [timers]);

    const addTimer = () => {
        const duration = parseInt(prompt("Enter duration in seconds:", "60"), 10);
        if (!isNaN(duration)) {
            setTimers([...timers, { duration, id: Date.now(), startDelay: 0 }]);
            setMaxDuration(Math.max(maxDuration, duration));
        }
    };

    const startTimers = () => {
        const updatedTimers = timers.map(timer => ({
            ...timer,
            startDelay: maxDuration - timer.duration
        }));
        setTimers(updatedTimers);
        setIsRunning(true);
    };

    const pauseResumeTimers = () => {
        setIsRunning(!isRunning);
    };

    const resetTimers = () => {
        setTimers([]);
        setMaxDuration(0);
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
                        startDelay={timer.startDelay}
                        isRunning={isRunning}
                    />
                ))}
            </div>
        </div>
    );
};

export default App;
