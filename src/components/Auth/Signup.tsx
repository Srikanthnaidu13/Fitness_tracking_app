import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, Calendar, Weight, Ruler, Target, Dumbbell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    name: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
    fitnessGoals: [] as string[]
  });
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const fitnessGoalOptions = [
    'Lose Weight', 'Build Muscle', 'Improve Endurance', 
    'Increase Strength', 'Enhance Flexibility', 'Better Health'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup({
        ...formData,
        age: parseInt(formData.age),
        weight: parseFloat(formData.weight),
        height: parseFloat(formData.height)
      });
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-lg w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full shadow-glow">
              <Dumbbell className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">Join FitTracker</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Start your fitness transformation today</p>
        </div>

        <form className="mt-8 space-y-6 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            {/* Account Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Account Information</h3>
              
              <div className="relative">
                <Mail className="absolute inset-y-0 left-0 pl-3 h-full w-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full px-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="relative">
                <Lock className="absolute inset-y-0 left-0 pl-3 h-full w-5 text-gray-400 pointer-events-none" />
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full px-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>

              <div className="relative">
                <User className="absolute inset-y-0 left-0 pl-3 h-full w-5 text-gray-400 pointer-events-none" />
                <input
                  name="username"
                  type="text"
                  required
                  className="w-full px-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>

              <div className="relative">
                <User className="absolute inset-y-0 left-0 pl-3 h-full w-5 text-gray-400 pointer-events-none" />
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full px-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Personal Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Personal Details</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Calendar className="absolute inset-y-0 left-0 pl-3 h-full w-5 text-gray-400 pointer-events-none" />
                  <input
                    name="age"
                    type="number"
                    min="13"
                    max="100"
                    required
                    className="w-full px-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleInputChange}
                  />
                </div>

                <select
                  name="gender"
                  required
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Weight className="absolute inset-y-0 left-0 pl-3 h-full w-5 text-gray-400 pointer-events-none" />
                  <input
                    name="weight"
                    type="number"
                    min="30"
                    max="300"
                    step="0.1"
                    required
                    className="w-full px-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Weight (kg)"
                    value={formData.weight}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="relative">
                  <Ruler className="absolute inset-y-0 left-0 pl-3 h-full w-5 text-gray-400 pointer-events-none" />
                  <input
                    name="height"
                    type="number"
                    min="100"
                    max="250"
                    required
                    className="w-full px-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Height (cm)"
                    value={formData.height}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Fitness Goals */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Fitness Goals
              </h3>
              <div className="grid grid-cols-2 gap-2">
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
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || formData.fitnessGoals.length === 0}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition duration-200 hover:scale-105"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <UserPlus className="h-5 w-5 mr-2" />
                  Create Account
                </>
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}