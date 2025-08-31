import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Calendar, Camera, Plus } from 'lucide-react';
import { useFitness } from '../../contexts/FitnessContext';
import ProgressChart from './ProgressChart';
import MeasurementsCard from './MeasurementsCard';
import AchievementsBadges from './AchievementsBadges';

export default function Progress() {
  const { progress, addProgressEntry } = useFitness();
  const [showAddProgress, setShowAddProgress] = useState(false);
  const [newEntry, setNewEntry] = useState({
    weight: '',
    bodyFat: '',
    chest: '',
    waist: '',
    arms: '',
    thighs: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entry = {
      date: new Date().toISOString().split('T')[0],
      weight: parseFloat(newEntry.weight),
      bodyFat: newEntry.bodyFat ? parseFloat(newEntry.bodyFat) : undefined,
      measurements: {
        chest: newEntry.chest ? parseFloat(newEntry.chest) : undefined,
        waist: newEntry.waist ? parseFloat(newEntry.waist) : undefined,
        arms: newEntry.arms ? parseFloat(newEntry.arms) : undefined,
        thighs: newEntry.thighs ? parseFloat(newEntry.thighs) : undefined,
      }
    };
    addProgressEntry(entry);
    setNewEntry({ weight: '', bodyFat: '', chest: '', waist: '', arms: '', thighs: '' });
    setShowAddProgress(false);
  };

  const latestProgress = progress[progress.length - 1];

  return (
    <div className="space-y-6 dark:text-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Progress Tracking</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Monitor your fitness journey and achievements</p>
        </div>
        <div className="flex space-x-3">
          <Link
            to="/camera"
            className="flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200"
          >
            <Camera className="h-4 w-4 mr-2" />
            Take Photo
          </Link>
          <Link
            to="/camera"
            className="flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200"
          >
            <Camera className="h-4 w-4 mr-2" />
            Take Photo
          </Link>
          <button
            onClick={() => setShowAddProgress(true)}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
          >
            <Plus className="h-4 w-4 mr-2" />
            Log Progress
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Current Weight</h3>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">{latestProgress?.weight || 0}kg</div>
          <p className="text-sm text-green-600 mt-2">-1.2kg this month</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Body Fat</h3>
            <TrendingUp className="h-5 w-5 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">{latestProgress?.bodyFat || 18}%</div>
          <p className="text-sm text-blue-600 mt-2">-2.5% this month</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Days Tracked</h3>
            <Calendar className="h-5 w-5 text-purple-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">{progress.length}</div>
          <p className="text-sm text-purple-600 mt-2">Keep it up!</p>
        </div>
      </div>

      {/* Charts and Measurements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgressChart data={progress} />
        <MeasurementsCard measurements={latestProgress?.measurements} />
      </div>

      {/* Achievements */}
      <AchievementsBadges />

      {/* Add Progress Modal */}
      {showAddProgress && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Log Progress</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={newEntry.weight}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, weight: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Body Fat (%)</label>
                <input
                  type="number"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={newEntry.bodyFat}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, bodyFat: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Chest (cm)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    value={newEntry.chest}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, chest: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Waist (cm)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    value={newEntry.waist}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, waist: e.target.value }))}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddProgress(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                >
                  Save Progress
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}