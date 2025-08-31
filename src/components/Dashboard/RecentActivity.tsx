import React from 'react';
import { CheckCircle, Award, TrendingUp } from 'lucide-react';

export default function RecentActivity() {
  const activities = [
    {
      id: '1',
      type: 'workout',
      title: 'Completed Push-ups',
      description: '3 sets of 20 reps',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'text-green-500'
    },
    {
      id: '2',
      type: 'achievement',
      title: 'First Week Complete',
      description: 'Earned achievement badge',
      time: '1 day ago',
      icon: Award,
      color: 'text-amber-500'
    },
    {
      id: '3',
      type: 'progress',
      title: 'Weight Updated',
      description: 'Lost 0.3kg this week',
      time: '2 days ago',
      icon: TrendingUp,
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <div className={`p-2 rounded-full bg-gray-100`}>
              <activity.icon className={`h-4 w-4 ${activity.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
              <p className="text-sm text-gray-500">{activity.description}</p>
              <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}