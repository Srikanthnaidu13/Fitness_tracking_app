import React from 'react';
import { Play, Plus, Camera, Timer, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function QuickActions() {
  const actions = [
    {
      title: 'Start Workout',
      description: 'Begin today\'s session',
      icon: Play,
      href: '/workouts',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Log Progress',
      description: 'Update measurements',
      icon: Plus,
      href: '/progress',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Take Photo',
      description: 'Progress picture',
      icon: Camera,
      href: '/camera',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Weekly Report',
      description: 'View analytics',
      icon: FileText,
      href: '/reports',
      color: 'from-amber-500 to-amber-600'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Link
            key={action.title}
            to={action.href}
            className="group p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-200 hover:shadow-md transform hover:-translate-y-1 bg-white dark:bg-gray-700"
          >
            <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${action.color} mb-3`}>
              <action.icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200">
                {action.title}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{action.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}