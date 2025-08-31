import React from 'react';
import { Clock, Users, Utensils } from 'lucide-react';

export default function MealPlan() {
  const meals = [
    {
      id: '1',
      name: 'Breakfast',
      time: '8:00 AM',
      foods: ['Greek Yogurt with Berries', 'Whole Grain Toast', 'Green Tea'],
      calories: 420,
      protein: 25,
      completed: true
    },
    {
      id: '2',
      name: 'Mid-Morning Snack',
      time: '10:30 AM',
      foods: ['Apple with Almond Butter'],
      calories: 190,
      protein: 6,
      completed: true
    },
    {
      id: '3',
      name: 'Lunch',
      time: '1:00 PM',
      foods: ['Grilled Chicken Salad', 'Quinoa', 'Olive Oil Dressing'],
      calories: 520,
      protein: 35,
      completed: false
    },
    {
      id: '4',
      name: 'Pre-Workout',
      time: '4:30 PM',
      foods: ['Banana', 'Protein Shake'],
      calories: 280,
      protein: 25,
      completed: false
    },
    {
      id: '5',
      name: 'Dinner',
      time: '7:30 PM',
      foods: ['Salmon Fillet', 'Sweet Potato', 'Steamed Broccoli'],
      calories: 580,
      protein: 40,
      completed: false
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Today's Meal Plan</h2>
      
      <div className="space-y-4">
        {meals.map((meal) => (
          <div
            key={meal.id}
            className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
              meal.completed 
                ? 'border-green-200 bg-green-50' 
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className={`font-semibold ${
                    meal.completed ? 'text-green-700' : 'text-gray-900'
                  }`}>
                    {meal.name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {meal.time}
                  </div>
                </div>

                <div className="space-y-1 mb-3">
                  {meal.foods.map((food, index) => (
                    <p key={index} className={`text-sm ${
                      meal.completed ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      • {food}
                    </p>
                  ))}
                </div>

                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Utensils className="h-4 w-4 mr-1" />
                    {meal.calories} kcal
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-1" />
                    {meal.protein}g protein
                  </div>
                </div>
              </div>

              <button
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  meal.completed
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {meal.completed ? 'Completed' : 'Mark Done'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}