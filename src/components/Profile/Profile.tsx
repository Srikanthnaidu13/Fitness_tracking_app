import React, { useState } from 'react';
import { Edit, Save, X, User, Mail, Calendar, Weight, Ruler, Target } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    age: user?.age || 0,
    weight: user?.weight || 0,
    height: user?.height || 0,
    fitnessGoals: user?.fitnessGoals || []
  });

  const fitnessGoalOptions = [
    'Lose Weight', 'Build Muscle', 'Improve Endurance', 
    'Increase Strength', 'Enhance Flexibility', 'Better Health'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'weight' || name === 'height' ? Number(value) : value
    }));
  };

  const handleGoalChange = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      fitnessGoals: prev.fitnessGoals.includes(goal)
        ? prev.fitnessGoals.filter(g => g !== goal)
        : [...prev.fitnessGoals, goal]
    }));
  };

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      age: user?.age || 0,
      weight: user?.weight || 0,
      height: user?.height || 0,
      fitnessGoals: user?.fitnessGoals || []
    });
    setIsEditing(false);
  };

  const bmi = user?.weight && user?.height ? (user.weight / Math.pow(user.height / 100, 2)).toFixed(1) : 0;
  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600' };
    if (bmi < 25) return { category: 'Normal', color: 'text-green-600' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-amber-600' };
    return { category: 'Obese', color: 'text-red-600' };
  };

  const bmiInfo = getBMICategory(Number(bmi));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-1">Manage your personal information and fitness goals</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleCancel}
              className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-8">
          <div className="flex items-center space-x-6">
            <div className="h-24 w-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-white">
                {user?.name?.charAt(0)}
              </span>
            </div>
            <div className="text-white">
              <h2 className="text-2xl font-bold">{user?.name}</h2>
              <p className="text-blue-100 mt-1">@{user?.username}</p>
              <p className="text-blue-100 text-sm mt-2">
                Member since {new Date(user?.joinedAt || '').toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    {isEditing ? (
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 mt-1">{user?.name}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    {isEditing ? (
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 mt-1">{user?.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">Age</label>
                      {isEditing ? (
                        <input
                          name="age"
                          type="number"
                          value={formData.age}
                          onChange={handleInputChange}
                          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 mt-1">{user?.age} years</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <p className="text-gray-900 mt-1 capitalize">{user?.gender}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Weight className="h-5 w-5 text-gray-400" />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">Weight</label>
                      {isEditing ? (
                        <input
                          name="weight"
                          type="number"
                          step="0.1"
                          value={formData.weight}
                          onChange={handleInputChange}
                          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 mt-1">{user?.weight} kg</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Ruler className="h-5 w-5 text-gray-400" />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">Height</label>
                      {isEditing ? (
                        <input
                          name="height"
                          type="number"
                          value={formData.height}
                          onChange={handleInputChange}
                          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 mt-1">{user?.height} cm</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Health Metrics */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Health Metrics</h3>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                <div className="text-center">
                  <h4 className="text-sm font-medium text-gray-700">Body Mass Index</h4>
                  <div className="text-3xl font-bold text-gray-900 mt-2">{bmi}</div>
                  <p className={`text-sm mt-1 font-medium ${bmiInfo.color}`}>
                    {bmiInfo.category}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <Target className="h-4 w-4 mr-1" />
                  Fitness Goals
                </h4>
                {isEditing ? (
                  <div className="grid grid-cols-1 gap-2">
                    {fitnessGoalOptions.map(goal => (
                      <label
                        key={goal}
                        className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                          formData.fitnessGoals.includes(goal)
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={formData.fitnessGoals.includes(goal)}
                          onChange={() => handleGoalChange(goal)}
                        />
                        <span className="text-sm font-medium">{goal}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {user?.fitnessGoals?.map(goal => (
                      <div key={goal} className="flex items-center p-2 bg-blue-50 text-blue-700 rounded-lg">
                        <span className="text-sm font-medium">{goal}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Achievements</h3>
        
        {user?.achievements && user.achievements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {user.achievements.map(achievement => (
              <div key={achievement.id} className="flex items-center p-4 bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-lg">
                <div className="text-2xl mr-3">{achievement.icon}</div>
                <div>
                  <h4 className="font-semibold text-amber-800">{achievement.title}</h4>
                  <p className="text-sm text-amber-600">{achievement.description}</p>
                  <p className="text-xs text-amber-500 mt-1">
                    {new Date(achievement.earnedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🏆</div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">No achievements yet</h4>
            <p className="text-gray-600">Keep working out to earn your first badge!</p>
          </div>
        )}
      </div>
    </div>
  );
}