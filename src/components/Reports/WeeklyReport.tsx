import React, { useState } from 'react';
import { FileText, Download, Calendar, TrendingUp, Target, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { useFitness } from '../../contexts/FitnessContext';
import { useAuth } from '../../contexts/AuthContext';

export default function WeeklyReport() {
  const { workoutPlan, weeklyStats, progress } = useFitness();
  const { user } = useAuth();
  const [selectedWeek, setSelectedWeek] = useState(0);

  const weeks = [
    { start: '2025-01-13', end: '2025-01-19', label: 'This Week' },
    { start: '2025-01-06', end: '2025-01-12', label: 'Last Week' },
    { start: '2024-12-30', end: '2025-01-05', label: '2 Weeks Ago' },
    { start: '2024-12-23', end: '2024-12-29', label: '3 Weeks Ago' }
  ];

  const currentWeek = weeks[selectedWeek];

  const generatePDF = () => {
    // Simulate PDF generation
    const reportData = {
      user: user?.name,
      week: currentWeek.label,
      stats: weeklyStats
    };
    console.log('Generating PDF report:', reportData);
    alert('PDF report downloaded successfully!');
  };

  const workoutCompletionRate = Math.round((weeklyStats.completedExercises / weeklyStats.totalExercises) * 100);
  const weeklyGoals = [
    { name: 'Workout Completion', current: workoutCompletionRate, target: 80, unit: '%' },
    { name: 'Calories Burned', current: weeklyStats.caloriesBurned, target: 3000, unit: 'kcal' },
    { name: 'Consistency Score', current: weeklyStats.consistencyScore, target: 90, unit: '%' },
    { name: 'Avg Workout Time', current: weeklyStats.avgWorkoutDuration, target: 60, unit: 'min' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Weekly Reports</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Analyze your fitness progress and performance</p>
        </div>
        <button
          onClick={generatePDF}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
        >
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </button>
      </div>

      {/* Week Selector */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedWeek(Math.min(selectedWeek + 1, weeks.length - 1))}
            disabled={selectedWeek >= weeks.length - 1}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{currentWeek.label}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {new Date(currentWeek.start).toLocaleDateString()} - {new Date(currentWeek.end).toLocaleDateString()}
            </p>
          </div>
          
          <button
            onClick={() => setSelectedWeek(Math.max(selectedWeek - 1, 0))}
            disabled={selectedWeek <= 0}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Weekly Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Workouts</h3>
            <Calendar className="h-5 w-5 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">{weeklyStats.workoutsCompleted}</div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">out of 6 planned</p>
          <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(weeklyStats.workoutsCompleted / 6) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Calories Burned</h3>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">{weeklyStats.caloriesBurned.toLocaleString()}</div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">kcal this week</p>
          <p className="text-sm text-green-600 mt-2">+15% vs last week</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Consistency</h3>
            <Target className="h-5 w-5 text-purple-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">{weeklyStats.consistencyScore}%</div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">adherence score</p>
          <p className="text-sm text-purple-600 mt-2">Excellent!</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Avg Duration</h3>
            <Award className="h-5 w-5 text-amber-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">{weeklyStats.avgWorkoutDuration}min</div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">per workout</p>
          <p className="text-sm text-amber-600 mt-2">On target!</p>
        </div>
      </div>

      {/* Goals Progress */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Weekly Goals Progress</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {weeklyGoals.map((goal) => {
            const percentage = Math.min((goal.current / goal.target) * 100, 100);
            const isAchieved = goal.current >= goal.target;
            
            return (
              <div key={goal.name} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{goal.name}</h3>
                  <span className={`text-sm font-medium ${
                    isAchieved ? 'text-green-600' : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {goal.current}{goal.unit} / {goal.target}{goal.unit}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${
                      isAchieved 
                        ? 'bg-gradient-to-r from-green-500 to-green-600' 
                        : 'bg-gradient-to-r from-blue-500 to-purple-600'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {isAchieved ? '🎉 Goal achieved!' : `${Math.round(percentage)}% complete`}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Workout Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Workout Summary</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workoutPlan.map((day, index) => {
            const completedCount = day.exercises.filter(ex => ex.completed).length;
            const completionRate = Math.round((completedCount / day.exercises.length) * 100);
            
            return (
              <div key={day.day} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{day.day}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{day.focus}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    day.completed 
                      ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                  }`}>
                    <span className="text-sm font-bold">{completionRate}%</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Exercises:</span>
                    <span className="text-gray-900 dark:text-white">{completedCount}/{day.exercises.length}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${completionRate}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Performance Insights</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Strengths This Week</h3>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                <span className="text-sm text-green-800 dark:text-green-200">Consistent workout schedule</span>
              </div>
              <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                <span className="text-sm text-green-800 dark:text-green-200">Exceeded calorie burn target</span>
              </div>
              <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                <span className="text-sm text-green-800 dark:text-green-200">Improved workout duration</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Areas for Improvement</h3>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-3" />
                <span className="text-sm text-amber-800 dark:text-amber-200">Focus on leg day completion</span>
              </div>
              <div className="flex items-center p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-3" />
                <span className="text-sm text-amber-800 dark:text-amber-200">Increase rest time between sets</span>
              </div>
              <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                <span className="text-sm text-blue-800 dark:text-blue-200">Add more cardio sessions</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Muscle Group Focus */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Muscle Group Training</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: 'Chest', sessions: 2, color: 'blue' },
            { name: 'Back', sessions: 2, color: 'green' },
            { name: 'Legs', sessions: 3, color: 'purple' },
            { name: 'Shoulders', sessions: 2, color: 'amber' },
            { name: 'Arms', sessions: 3, color: 'red' },
            { name: 'Core', sessions: 4, color: 'indigo' }
          ].map((muscle) => (
            <div key={muscle.name} className="text-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-${muscle.color}-100 dark:bg-${muscle.color}-900/30 flex items-center justify-center`}>
                <span className={`text-${muscle.color}-600 dark:text-${muscle.color}-400 font-bold text-lg`}>
                  {muscle.sessions}
                </span>
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white text-sm">{muscle.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">sessions</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4">🎯 Next Week Recommendations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">Workout Adjustments</h3>
            <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <span>Increase weight on bench press by 2.5kg</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <span>Add extra set to leg exercises</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <span>Focus on form over speed in cardio</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">Nutrition Focus</h3>
            <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <span>Increase protein intake by 10g daily</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <span>Add post-workout meal within 30 minutes</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <span>Maintain hydration goals consistently</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}