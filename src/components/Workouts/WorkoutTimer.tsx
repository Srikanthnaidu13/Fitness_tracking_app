import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, X, SkipForward } from 'lucide-react';

interface WorkoutTimerProps {
  onClose: () => void;
  exerciseName?: string;
  restTime?: number;
}

export default function WorkoutTimer({ onClose, exerciseName, restTime }: WorkoutTimerProps) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isRest, setIsRest] = useState(false);
  const [restDuration, setRestDuration] = useState(restTime || 60);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prevTime => {
          if (isRest && prevTime <= 1) {
            setIsRest(false);
            setIsRunning(false);
            // Play notification sound (if available)
            return 0;
          }
          return isRest ? prevTime - 1 : prevTime + 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, isRest]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
    setIsRest(false);
  };

  const startRestTimer = (duration: number) => {
    setTime(duration);
    setRestDuration(duration);
    setIsRest(true);
    setIsRunning(true);
  };

  const skipRest = () => {
    setTime(0);
    setIsRest(false);
    setIsRunning(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {isRest ? 'Rest Timer' : 'Workout Timer'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 text-center">
          {exerciseName && (
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200">{exerciseName}</p>
            </div>
          )}

          <div className={`text-6xl font-bold mb-6 transition-colors duration-300 ${
            isRest 
              ? time <= 10 
                ? 'text-red-500 animate-pulse' 
                : 'text-amber-600' 
              : 'text-blue-600'
          }`}>
            {formatTime(time)}
          </div>

          {isRest && (
            <div className="mb-6">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${((restDuration - time) / restDuration) * 100}%` }}
                />
              </div>
              <p className="text-sm text-amber-600">Rest time remaining</p>
            </div>
          )}

          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={toggleTimer}
              className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-200 transform hover:scale-105 ${
                isRunning
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="h-5 w-5 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-5 w-5 mr-2" />
                  Start
                </>
              )}
            </button>

            <button
              onClick={resetTimer}
              className="flex items-center px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              Reset
            </button>

            {isRest && (
              <button
                onClick={skipRest}
                className="flex items-center px-4 py-3 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-all duration-200"
              >
                <SkipForward className="h-4 w-4 mr-2" />
                Skip
              </button>
            )}
          </div>

          {!isRest && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Rest Timers</h3>
              <div className="flex justify-center space-x-2">
                {[30, 60, 90, 120].map(seconds => (
                  <button
                    key={seconds}
                    onClick={() => startRestTimer(seconds)}
                    className="px-3 py-2 text-sm bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-lg hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors duration-200"
                  >
                    {seconds}s
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}