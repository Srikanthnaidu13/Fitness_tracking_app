import React, { useState } from 'react';
import { Apple, Target, TrendingUp, Plus } from 'lucide-react';
import { useFitness } from '../../contexts/FitnessContext';
import NutritionCard from './NutritionCard';
import MealPlan from './MealPlan';

export default function Diet() {
  const { nutritionGoals } = useFitness();
  const [currentIntake, setCurrentIntake] = useState({
    calories: 1850,
    protein: 120,
    carbs: 180,
    fat: 65
  });

  const macros = [
    {
      name: 'Calories',
      current: currentIntake.calories,
      goal: nutritionGoals.calories,
      unit: 'kcal',
      color: 'blue'
    },
    {
      name: 'Protein',
      current: currentIntake.protein,
      goal: nutritionGoals.protein,
      unit: 'g',
      color: 'green'
    },
    {
      name: 'Carbs',
      current: currentIntake.carbs,
      goal: nutritionGoals.carbs,
      unit: 'g',
      color: 'amber'
    },
    {
      name: 'Fat',
      current: currentIntake.fat,
      goal: nutritionGoals.fat,
      unit: 'g',
      color: 'purple'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Diet & Nutrition</h1>
          <p className="text-gray-600 mt-1">Track your daily nutrition and meal plans</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105">
          <Plus className="h-4 w-4 mr-2" />
          Log Meal
        </button>
      </div>

      {/* Today's Progress */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Today's Nutrition</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {macros.map((macro) => (
            <NutritionCard key={macro.name} {...macro} />
          ))}
        </div>
      </div>

      {/* Meal Plan */}
      <MealPlan />

      {/* Water Intake */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Water Intake</h2>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Daily Goal: 3L</span>
              <span className="text-sm font-medium text-blue-600">2.1L / 3L</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all duration-500" style={{ width: '70%' }} />
            </div>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
            <Plus className="h-4 w-4 mr-1" />
            250ml
          </button>
        </div>
      </div>
    </div>
  );
}