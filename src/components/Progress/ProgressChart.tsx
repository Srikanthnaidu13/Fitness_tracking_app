import React from 'react';
import { ProgressEntry } from '../../contexts/FitnessContext';

interface ProgressChartProps {
  data: ProgressEntry[];
}

export default function ProgressChart({ data }: ProgressChartProps) {
  const maxWeight = Math.max(...data.map(entry => entry.weight)) + 2;
  const minWeight = Math.min(...data.map(entry => entry.weight)) - 2;
  const weightRange = maxWeight - minWeight;

  const getYPosition = (weight: number) => {
    return ((maxWeight - weight) / weightRange) * 100;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Weight Progress</h2>
      
      <div className="relative h-64 mb-4">
        <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(y => (
            <line
              key={y}
              x1="0"
              y1={y * 2}
              x2="400"
              y2={y * 2}
              stroke="#f3f4f6"
              strokeWidth="1"
            />
          ))}

          {/* Weight line */}
          <polyline
            points={data.map((entry, index) => 
              `${(index / (data.length - 1)) * 400},${getYPosition(entry.weight) * 2}`
            ).join(' ')}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {data.map((entry, index) => (
            <circle
              key={index}
              cx={(index / (data.length - 1)) * 400}
              cy={getYPosition(entry.weight) * 2}
              r="4"
              fill="#3B82F6"
              stroke="#ffffff"
              strokeWidth="2"
            />
          ))}

          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 -ml-8">
          <span>{maxWeight.toFixed(1)}</span>
          <span>{((maxWeight + minWeight) / 2).toFixed(1)}</span>
          <span>{minWeight.toFixed(1)}</span>
        </div>
      </div>

      {/* X-axis labels */}
      <div className="flex justify-between text-xs text-gray-500">
        {data.map((entry, index) => (
          <span key={index}>
            {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        ))}
      </div>
    </div>
  );
}