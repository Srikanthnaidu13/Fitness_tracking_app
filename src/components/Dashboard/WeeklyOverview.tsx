import React from 'react';
import { CheckCircle, Circle, Clock } from 'lucide-react';
import { useFitness } from '../../contexts/FitnessContext';

export default function WeeklyOverview() {
  const { workoutPlan } = useFitness();
  const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
  const todayIndex = today === 0 ? 6 : today - 1; // Convert to our 0-5 system (Mon-Sat)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Weekly Overview</h2>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          This Week
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workoutPlan.map((day, index) => (
          <div
            key={day.day}
            className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
              index === todayIndex
                ? 'border-blue-500 bg-blue-50'
                : day.completed
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className={`font-semibold ${
                index === todayIndex ? 'text-blue-700' : day.completed ? 'text-green-700' : 'text-gray-900'
              }`}>
                {day.day}
                {index === todayIndex && (
                  <span className="ml-2 px-2 py-1 text-xs bg-blue-500 text-white rounded-full">Today</span>
                )}
              </h3>
              {day.completed ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <Circle className="h-5 w-5 text-gray-300" />
              )}
            </div>

            <div className="space-y-2">
              {day.exercises.slice(0, 3).map((exercise, exerciseIndex) => (
                <div key={exercise.id} className="flex items-center text-sm">
                  {exercise.completed ? (
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <Circle className="h-4 w-4 text-gray-300 mr-2" />
                  )}
                  <span className={exercise.completed ? 'text-gray-500 line-through' : 'text-gray-700'}>
                    {exercise.name}
                  </span>
                </div>
              ))}
              {day.exercises.length > 3 && (
                <p className="text-xs text-gray-500 ml-6">+{day.exercises.length - 3} more exercises</p>
              )}
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className={`text-xs font-medium ${
                index === todayIndex ? 'text-blue-600' : day.completed ? 'text-green-600' : 'text-gray-500'
              }`}>
                {day.exercises.filter(ex => ex.completed).length}/{day.exercises.length} completed
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}