import { useState, useEffect } from 'react';
import './Timer.css';

const Timer = ({ onSave }) => {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [task, setTask] = useState('');

    useEffect(() => {
        let interval = null;
        if (isRunning) {
            interval = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        } else if (!isRunning && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning, seconds]);

    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;

        const pad = (num) => num.toString().padStart(2, '0');
        return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
    };

    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };

    const stopTimer = () => {
        setIsRunning(false);
        if (onSave) {
            onSave({ task: task || 'Untitled Task', duration: seconds, timestamp: new Date() });
        }
        setSeconds(0);
        setTask('');
    };

    return (
        <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px' }}>
            <div className="timer-container">

                <div className="timer-input-group">
                    <input
                        type="text"
                        className="timer-input"
                        placeholder="What are you working on?"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                    />
                </div>

                <div className={`timer-display ${isRunning ? 'active' : ''}`}>
                    {formatTime(seconds)}
                </div>

                <button
                    className={`btn-neon ${isRunning ? 'btn-stop btn-circle' : 'btn-primary'}`}
                    onClick={toggleTimer}
                    style={isRunning ? {} : { width: '100px' }}
                >
                    {isRunning ? '||' : 'START'}
                </button>

                {/* Show Stop/Done button only if timer has run */}
                {(seconds > 0 || isRunning) && (
                    <button
                        className="btn-neon btn-stop"
                        style={{ marginLeft: '10px', fontSize: '0.9rem' }}
                        onClick={stopTimer}
                    >
                        STOP
                    </button>
                )}
            </div>
        </div>
    );
};

export default Timer;
