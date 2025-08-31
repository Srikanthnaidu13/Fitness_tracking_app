import React from 'react';

interface NutritionCardProps {
  name: string;
  current: number;
  goal: number;
  unit: string;
  color: 'blue' | 'green' | 'amber' | 'purple';
}

export default function NutritionCard({ name, current, goal, unit, color }: NutritionCardProps) {
  const percentage = Math.round((current / goal) * 100);
  const isOverGoal = current > goal;

  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    amber: 'from-amber-500 to-amber-600',
    purple: 'from-purple-500 to-purple-600'
  };

  const ringClasses = {
    blue: 'text-blue-500',
    green: 'text-green-500',
    amber: 'text-amber-500',
    purple: 'text-purple-500'
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200">
      <div className="text-center">
        <div className="relative inline-flex">
          <svg className="w-16 h-16 transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-gray-200"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              className={ringClasses[color]}
              strokeDasharray={`${Math.min(percentage, 100) * 1.76} 176`}
              style={{
                transition: 'stroke-dasharray 0.5s ease-in-out',
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-lg font-bold ${isOverGoal ? 'text-red-500' : ringClasses[color]}`}>
              {percentage}%
            </span>
          </div>
        </div>

        <h3 className="font-semibold text-gray-900 mt-3">{name}</h3>
        <p className="text-sm text-gray-600 mt-1">
          {current}{unit} / {goal}{unit}
        </p>
        
        {isOverGoal && (
          <p className="text-xs text-red-500 mt-1">Over goal</p>
        )}
      </div>
    </div>
  );
}