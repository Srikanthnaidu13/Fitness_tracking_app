import React from 'react';
import { Calendar, Target, Trophy, TrendingUp, Clock, Flame } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useFitness } from '../../contexts/FitnessContext';
import StatsCard from './StatsCard';
import WeeklyOverview from './WeeklyOverview';
import RecentActivity from './RecentActivity';
import QuickActions from './QuickActions';

export default function Dashboard() {
  const { user } = useAuth();
  const { workoutPlan, progress } = useFitness();

  const completedWorkouts = workoutPlan.filter(day => day.completed).length;
  const totalExercises = workoutPlan.reduce((total, day) => total + day.exercises.length, 0);
  const completedExercises = workoutPlan.reduce((total, day) => 
    total + day.exercises.filter(ex => ex.completed).length, 0);
  
  const currentWeight = progress[progress.length - 1]?.weight || user?.weight || 0;
  const weightChange = progress.length > 1 
    ? currentWeight - progress[0].weight 
    : 0;

  const statsData = [
    {
      title: 'Completed Workouts',
      value: completedWorkouts.toString(),
      total: '6 days',
      icon: Calendar,
      color: 'blue',
      change: `${Math.round((completedWorkouts / 6) * 100)}%`
    },
    {
      title: 'Exercises Done',
      value: completedExercises.toString(),
      total: `${totalExercises} total`,
      icon: Target,
      color: 'green',
      change: `${Math.round((completedExercises / totalExercises) * 100)}%`
    },
    {
      title: 'Current Weight',
      value: `${currentWeight}kg`,
      total: 'Goal: 70kg',
      icon: TrendingUp,
      color: 'purple',
      change: weightChange > 0 ? `+${weightChange.toFixed(1)}kg` : `${weightChange.toFixed(1)}kg`
    },
    {
      title: 'Achievements',
      value: user?.achievements?.length.toString() || '0',
      total: '10 available',
      icon: Trophy,
      color: 'amber',
      change: 'New badge!'
    }
  ];

  return (
    <div className="space-y-8 dark:text-white">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name?.split(' ')[0]}!</h1>
            <p className="text-blue-100 dark:text-blue-200 text-lg">Ready to crush your fitness goals today?</p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{new Date().getDate()}</div>
              <div className="text-sm text-blue-100 dark:text-blue-200">
                {new Date().toLocaleDateString('en-US', { month: 'short' })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weekly Overview */}
        <div className="lg:col-span-2">
          <WeeklyOverview />
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          <QuickActions />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}