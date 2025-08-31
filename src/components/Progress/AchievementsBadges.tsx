import React from 'react';
import { Trophy, Star, Target, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function AchievementsBadges() {
  const { user } = useAuth();

  const allAchievements = [
    {
      id: '1',
      title: 'First Week Complete',
      description: 'Completed your first week of workouts',
      icon: '🏆',
      earned: true,
      earnedAt: '2025-01-01'
    },
    {
      id: '2',
      title: 'Early Bird',
      description: 'Complete 5 morning workouts',
      icon: '🌅',
      earned: false
    },
    {
      id: '3',
      title: 'Consistency King',
      description: 'No missed workouts for 2 weeks',
      icon: '👑',
      earned: false
    },
    {
      id: '4',
      title: 'Weight Loss Warrior',
      description: 'Lost 5kg towards your goal',
      icon: '⚖️',
      earned: false
    },
    {
      id: '5',
      title: 'Social Butterfly',
      description: 'Share 3 progress photos',
      icon: '📸',
      earned: false
    },
    {
      id: '6',
      title: 'Meal Prep Master',
      description: 'Complete 7 days of meal logging',
      icon: '🍱',
      earned: false
    }
  ];

  const earnedCount = allAchievements.filter(a => a.earned).length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Achievements</h2>
        <div className="flex items-center text-sm text-gray-600">
          <Trophy className="h-4 w-4 mr-1" />
          {earnedCount}/{allAchievements.length} Earned
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {allAchievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`p-4 rounded-lg border-2 text-center transition-all duration-300 hover:scale-105 ${
              achievement.earned
                ? 'border-amber-300 bg-gradient-to-br from-amber-50 to-amber-100'
                : 'border-gray-200 bg-gray-50 opacity-60'
            }`}
          >
            <div className={`text-3xl mb-2 ${achievement.earned ? 'animate-bounce' : 'grayscale'}`}>
              {achievement.icon}
            </div>
            <h3 className={`font-semibold text-sm mb-1 ${
              achievement.earned ? 'text-amber-800' : 'text-gray-600'
            }`}>
              {achievement.title}
            </h3>
            <p className={`text-xs ${
              achievement.earned ? 'text-amber-600' : 'text-gray-500'
            }`}>
              {achievement.description}
            </p>
            {achievement.earned && achievement.earnedAt && (
              <p className="text-xs text-amber-500 mt-2 font-medium">
                Earned {new Date(achievement.earnedAt).toLocaleDateString()}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}