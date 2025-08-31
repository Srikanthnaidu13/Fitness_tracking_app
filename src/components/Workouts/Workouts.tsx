import React, { useState } from 'react';
import { Play, CheckCircle, Circle, Clock, Target, Zap } from 'lucide-react';
import { useFitness } from '../../contexts/FitnessContext';
import WorkoutTimer from './WorkoutTimer';
import ExerciseCard from './ExerciseCard';

export default function Workouts() {
  const { workoutPlan, completeExercise } = useFitness();
  const [selectedDay, setSelectedDay] = useState(0);
  const [showTimer, setShowTimer] = useState(false);
  const [timerExercise, setTimerExercise] = useState<{ name: string; restTime?: number } | null>(null);

  const currentDay = workoutPlan[selectedDay];
  const completedExercises = currentDay.exercises.filter(ex => ex.completed).length;
  const totalCaloriesBurned = completedExercises * 45; // Estimate 45 calories per exercise

  const handleStartTimer = (exerciseName: string, restTime?: number) => {
    setTimerExercise({ name: exerciseName, restTime });
    setShowTimer(true);
  };

  const handleCloseTimer = () => {
    setShowTimer(false);
    setTimerExercise(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Workouts</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track your weekly training schedule</p>
        </div>
        <button
          onClick={() => setShowTimer(true)}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105"
        >
          <Clock className="h-4 w-4 mr-2" />
          Start Timer
        </button>
      </div>

      {/* Day Selector */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {workoutPlan.map((day, index) => (
            <button
              key={day.day}
              onClick={() => setSelectedDay(index)}
              className={`flex-shrink-0 px-4 py-3 rounded-lg font-medium transition-all duration-200 min-w-[120px] ${
                selectedDay === index
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <div className="text-sm font-bold">{day.day}</div>
              <div className="text-xs mt-1 opacity-90">{day.focus}</div>
              <div className="flex items-center justify-center mt-2">
                {day.completed ? (
                  <CheckCircle className="h-4 w-4 mr-1 text-green-400" />
                ) : (
                  <Circle className="h-4 w-4 mr-1 text-gray-400" />
                )}
                <span className="text-xs">
                  {day.exercises.filter(ex => ex.completed).length}/{day.exercises.length}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Workout Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Today's Focus</h3>
            <Target className="h-5 w-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{currentDay.focus}</div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{currentDay.exercises.length} exercises planned</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Progress</h3>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{completedExercises}/{currentDay.exercises.length}</div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
            <div 
              className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(completedExercises / currentDay.exercises.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Calories Burned</h3>
            <Zap className="h-5 w-5 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{totalCaloriesBurned}</div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">kcal estimated</p>
        </div>
      </div>

      {/* Current Day Workout */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{currentDay.day} - {currentDay.focus}</h2>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Progress: {completedExercises}/{currentDay.exercises.length}
            </div>
            <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(completedExercises / currentDay.exercises.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentDay.exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onComplete={() => completeExercise(selectedDay, exercise.id)}
              onStartTimer={handleStartTimer}
            />
          ))}
        </div>

        {currentDay.completed && (
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
              <div>
                <h3 className="font-semibold text-green-800 dark:text-green-200">Workout Complete! 🎉</h3>
                <p className="text-sm text-green-600 dark:text-green-300">Great job finishing your {currentDay.focus.toLowerCase()} workout!</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Timer Modal */}
      {showTimer && (
        <WorkoutTimer 
          onClose={handleCloseTimer}
          exerciseName={timerExercise?.name}
          restTime={timerExercise?.restTime}
        />
      )}
    </div>
  );
}