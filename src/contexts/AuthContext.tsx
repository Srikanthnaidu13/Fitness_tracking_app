import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  weight?: number;
  height?: number;
  fitnessGoals?: string[];
  achievements?: Achievement[];
  joinedAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: {
    email: string;
    password: string;
    username: string;
    name: string;
    age: number;
    gender: string;
    weight: number;
    height: number;
    fitnessGoals: string[];
  }) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem('fitness_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo user
    const demoUser: User = {
      id: '1',
      email,
      username: 'fituser123',
      name: 'Alex Johnson',
      age: 28,
      gender: 'male',
      weight: 75,
      height: 180,
      fitnessGoals: ['Lose Weight', 'Build Muscle'],
      achievements: [
        {
          id: '1',
          title: 'First Week Complete',
          description: 'Completed your first week of workouts',
          icon: '🏆',
          earnedAt: '2025-01-01'
        }
      ],
      joinedAt: '2024-12-15'
    };
    
    setUser(demoUser);
    localStorage.setItem('fitness_user', JSON.stringify(demoUser));
  };

  const signup = async (userData: any) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      username: userData.username,
      name: userData.name,
      age: userData.age,
      gender: userData.gender,
      weight: userData.weight,
      height: userData.height,
      fitnessGoals: userData.fitnessGoals,
      achievements: [],
      joinedAt: new Date().toISOString()
    };
    
    setUser(newUser);
    localStorage.setItem('fitness_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fitness_user');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('fitness_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}