import React from 'react';
import { Ruler } from 'lucide-react';

interface MeasurementsCardProps {
  measurements?: {
    chest?: number;
    waist?: number;
    arms?: number;
    thighs?: number;
  };
}

export default function MeasurementsCard({ measurements }: MeasurementsCardProps) {
  const measurementData = [
    { name: 'Chest', value: measurements?.chest || 0, unit: 'cm', change: '+2.5' },
    { name: 'Waist', value: measurements?.waist || 0, unit: 'cm', change: '-3.2' },
    { name: 'Arms', value: measurements?.arms || 0, unit: 'cm', change: '+1.8' },
    { name: 'Thighs', value: measurements?.thighs || 0, unit: 'cm', change: '+0.5' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Body Measurements</h2>
        <Ruler className="h-5 w-5 text-gray-500" />
      </div>

      <div className="space-y-4">
        {measurementData.map((measurement) => (
          <div key={measurement.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-semibold text-gray-900">{measurement.name}</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {measurement.value}{measurement.unit}
              </p>
            </div>
            <div className="text-right">
              <p className={`text-sm font-medium ${
                measurement.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {measurement.change}{measurement.unit}
              </p>
              <p className="text-xs text-gray-500">vs last month</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800 font-medium">💡 Progress Tip</p>
        <p className="text-sm text-blue-600 mt-1">
          Take measurements at the same time each week for accurate tracking
        </p>
      </div>
    </div>
  );
}