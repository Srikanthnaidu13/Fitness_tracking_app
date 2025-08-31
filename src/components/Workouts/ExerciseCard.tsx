import React, { useState } from 'react';
import { CheckCircle, Circle, Weight, Clock, Target, Info, Play } from 'lucide-react';
import { Exercise } from '../../contexts/FitnessContext';

interface ExerciseCardProps {
  exercise: Exercise;
  onComplete: () => void;
  onStartTimer: (exerciseName: string, restTime?: number) => void;
}

export default function ExerciseCard({ exercise, onComplete, onStartTimer }: ExerciseCardProps) {
  const [showInstructions, setShowInstructions] = useState(false);

  const difficultyColors = {
    Beginner: 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400',
    Intermediate: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400',
    Advanced: 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400'
  };

  return (
    <div className={`border rounded-xl p-4 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
      exercise.completed 
        ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20' 
        : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className={`font-semibold ${
            exercise.completed ? 'text-green-700 dark:text-green-400 line-through' : 'text-gray-900 dark:text-white'
          }`}>
            {exercise.name}
          </h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {exercise.muscleGroups.map(group => (
              <span key={group} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-full">
                {group}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={onComplete}
          className={`p-2 rounded-full transition-all duration-200 ${
            exercise.completed
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500'
          }`}
        >
          {exercise.completed ? (
            <CheckCircle className="h-5 w-5 text-white" />
          ) : (
            <Circle className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          )}
        </button>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Target className="h-4 w-4 mr-1" />
            <span>{exercise.sets} sets × {exercise.reps}</span>
          </div>
          <span className={`px-2 py-1 text-xs rounded-full ${difficultyColors[exercise.difficulty]}`}>
            {exercise.difficulty}
          </span>
        </div>
        
        {exercise.weight && (
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Weight className="h-4 w-4 mr-1" />
            <span>{exercise.weight}kg</span>
          </div>
        )}

        {exercise.restTime && (
          <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>Rest: {exercise.restTime}s</span>
            </div>
            <button
              onClick={() => onStartTimer(exercise.name, exercise.restTime)}
              className="flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded text-xs hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors duration-200"
            >
              <Play className="h-3 w-3 mr-1" />
              Timer
            </button>
          </div>
        )}

        {exercise.instructions && (
          <div>
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
            >
              <Info className="h-4 w-4 mr-1" />
              <span className="text-xs">Instructions</span>
            </button>
            {showInstructions && (
              <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-xs text-blue-800 dark:text-blue-200">{exercise.instructions}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}