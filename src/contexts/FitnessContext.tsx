import React, { createContext, useContext, useState } from 'react';

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight?: number;
  duration?: string;
  completed: boolean;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  muscleGroups: string[];
  instructions?: string;
  restTime?: number;
}

export interface WorkoutDay {
  day: string;
  focus: string;
  exercises: Exercise[];
  completed: boolean;
}

export interface ProgressEntry {
  date: string;
  weight: number;
  bodyFat?: number;
  measurements?: {
    chest?: number;
    waist?: number;
    arms?: number;
    thighs?: number;
  };
  photos?: string[];
}

export interface NutritionGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface WeeklyStats {
  workoutsCompleted: number;
  totalExercises: number;
  completedExercises: number;
  caloriesBurned: number;
  avgWorkoutDuration: number;
  consistencyScore: number;
}

interface FitnessContextType {
  workoutPlan: WorkoutDay[];
  progress: ProgressEntry[];
  nutritionGoals: NutritionGoals;
  weeklyStats: WeeklyStats;
  completeExercise: (dayIndex: number, exerciseId: string) => void;
  addProgressEntry: (entry: ProgressEntry) => void;
  updateNutritionGoals: (goals: NutritionGoals) => void;
  addProgressPhoto: (photo: string) => void;
}

const FitnessContext = createContext<FitnessContextType | undefined>(undefined);

export function useFitness() {
  const context = useContext(FitnessContext);
  if (context === undefined) {
    throw new Error('useFitness must be used within a FitnessProvider');
  }
  return context;
}

export function FitnessProvider({ children }: { children: React.ReactNode }) {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutDay[]>([
    {
      day: 'Monday',
      focus: 'Chest & Triceps',
      exercises: [
        { 
          id: '1', 
          name: 'Bench Press', 
          sets: 4, 
          reps: '8-12', 
          weight: 80, 
          completed: false, 
          difficulty: 'Intermediate', 
          muscleGroups: ['Chest', 'Triceps'],
          instructions: 'Keep your back flat and control the weight',
          restTime: 90
        },
        { 
          id: '2', 
          name: 'Incline Dumbbell Press', 
          sets: 3, 
          reps: '10-15', 
          weight: 25, 
          completed: false, 
          difficulty: 'Intermediate', 
          muscleGroups: ['Chest', 'Shoulders'],
          restTime: 75
        },
        { 
          id: '3', 
          name: 'Chest Flyes', 
          sets: 3, 
          reps: '12-15', 
          weight: 15, 
          completed: false, 
          difficulty: 'Beginner', 
          muscleGroups: ['Chest'],
          restTime: 60
        },
        { 
          id: '4', 
          name: 'Tricep Dips', 
          sets: 3, 
          reps: '10-15', 
          completed: false, 
          difficulty: 'Intermediate', 
          muscleGroups: ['Triceps'],
          restTime: 60
        },
        { 
          id: '5', 
          name: 'Overhead Tricep Extension', 
          sets: 3, 
          reps: '12-15', 
          weight: 20, 
          completed: false, 
          difficulty: 'Beginner', 
          muscleGroups: ['Triceps'],
          restTime: 60
        }
      ],
      completed: false
    },
    {
      day: 'Tuesday',
      focus: 'Back & Biceps',
      exercises: [
        { 
          id: '6', 
          name: 'Pull-ups', 
          sets: 4, 
          reps: '6-10', 
          completed: false, 
          difficulty: 'Advanced', 
          muscleGroups: ['Back', 'Biceps'],
          instructions: 'Full range of motion, control the descent',
          restTime: 90
        },
        { 
          id: '7', 
          name: 'Bent-over Rows', 
          sets: 4, 
          reps: '8-12', 
          weight: 70, 
          completed: false, 
          difficulty: 'Intermediate', 
          muscleGroups: ['Back', 'Biceps'],
          restTime: 75
        },
        { 
          id: '8', 
          name: 'Lat Pulldowns', 
          sets: 3, 
          reps: '10-15', 
          weight: 60, 
          completed: false, 
          difficulty: 'Beginner', 
          muscleGroups: ['Back'],
          restTime: 60
        },
        { 
          id: '9', 
          name: 'Bicep Curls', 
          sets: 3, 
          reps: '12-15', 
          weight: 15, 
          completed: false, 
          difficulty: 'Beginner', 
          muscleGroups: ['Biceps'],
          restTime: 45
        },
        { 
          id: '10', 
          name: 'Hammer Curls', 
          sets: 3, 
          reps: '12-15', 
          weight: 12, 
          completed: false, 
          difficulty: 'Beginner', 
          muscleGroups: ['Biceps'],
          restTime: 45
        }
      ],
      completed: false
    },
    {
      day: 'Wednesday',
      focus: 'Legs',
      exercises: [
        { 
          id: '11', 
          name: 'Squats', 
          sets: 4, 
          reps: '8-12', 
          weight: 100, 
          completed: false, 
          difficulty: 'Intermediate', 
          muscleGroups: ['Quadriceps', 'Glutes'],
          instructions: 'Keep knees aligned with toes, full depth',
          restTime: 120
        },
        { 
          id: '12', 
          name: 'Romanian Deadlifts', 
          sets: 4, 
          reps: '8-12', 
          weight: 80, 
          completed: false, 
          difficulty: 'Intermediate', 
          muscleGroups: ['Hamstrings', 'Glutes'],
          restTime: 90
        },
        { 
          id: '13', 
          name: 'Leg Press', 
          sets: 3, 
          reps: '15-20', 
          weight: 150, 
          completed: false, 
          difficulty: 'Beginner', 
          muscleGroups: ['Quadriceps', 'Glutes'],
          restTime: 75
        },
        { 
          id: '14', 
          name: 'Walking Lunges', 
          sets: 3, 
          reps: '12 each leg', 
          completed: false, 
          difficulty: 'Intermediate', 
          muscleGroups: ['Quadriceps', 'Glutes'],
          restTime: 60
        },
        { 
          id: '15', 
          name: 'Calf Raises', 
          sets: 4, 
          reps: '15-20', 
          weight: 40, 
          completed: false, 
          difficulty: 'Beginner', 
          muscleGroups: ['Calves'],
          restTime: 45
        }
      ],
      completed: false
    },
    {
      day: 'Thursday',
      focus: 'Shoulders & Abs',
      exercises: [
        { 
          id: '16', 
          name: 'Overhead Press', 
          sets: 4, 
          reps: '8-12', 
          weight: 50, 
          completed: false, 
          difficulty: 'Intermediate', 
          muscleGroups: ['Shoulders', 'Triceps'],
          instructions: 'Keep core tight, press straight up',
          restTime: 90
        },
        { 
          id: '17', 
          name: 'Lateral Raises', 
          sets: 3, 
          reps: '12-15', 
          weight: 10, 
          completed: false, 
          difficulty: 'Beginner', 
          muscleGroups: ['Shoulders'],
          restTime: 60
        },
        { 
          id: '18', 
          name: 'Rear Delt Flyes', 
          sets: 3, 
          reps: '12-15', 
          weight: 8, 
          completed: false, 
          difficulty: 'Beginner', 
          muscleGroups: ['Shoulders'],
          restTime: 60
        },
        { 
          id: '19', 
          name: 'Plank', 
          sets: 3, 
          reps: '45-60s', 
          completed: false, 
          difficulty: 'Intermediate', 
          muscleGroups: ['Core'],
          restTime: 60
        },
        { 
          id: '20', 
          name: 'Russian Twists', 
          sets: 3, 
          reps: '20-30', 
          weight: 10, 
          completed: false, 
          difficulty: 'Beginner', 
          muscleGroups: ['Core'],
          restTime: 45
        },
        { 
          id: '21', 
          name: 'Dead Bug', 
          sets: 3, 
          reps: '10 each side', 
          completed: false, 
          difficulty: 'Beginner', 
          muscleGroups: ['Core'],
          restTime: 45
        }
      ],
      completed: false
    },
    {
      day: 'Friday',
      focus: 'Full Body Circuit & Cardio',
      exercises: [
        { 
          id: '22', 
          name: 'Burpees', 
          sets: 4, 
          reps: '8-12', 
          completed: false, 
          difficulty: 'Advanced', 
          muscleGroups: ['Full Body', 'Cardio'],
          instructions: 'Explosive movement, maintain form',
          restTime: 60
        },
        { 
          id: '23', 
          name: 'Mountain Climbers', 
          sets: 4, 
          reps: '30s', 
          completed: false, 
          difficulty: 'Intermediate', 
          muscleGroups: ['Core', 'Cardio'],
          restTime: 45
        },
        { 
          id: '24', 
          name: 'Kettlebell Swings', 
          sets: 4, 
          reps: '15-20', 
          weight: 16, 
          completed: false, 
          difficulty: 'Intermediate', 
          muscleGroups: ['Glutes', 'Core', 'Cardio'],
          restTime: 60
        },
        { 
          id: '25', 
          name: 'Jump Squats', 
          sets: 3, 
          reps: '12-15', 
          completed: false, 
          difficulty: 'Intermediate', 
          muscleGroups: ['Legs', 'Cardio'],
          restTime: 60
        },
        { 
          id: '26', 
          name: 'High Knees', 
          sets: 3, 
          reps: '30s', 
          completed: false, 
          difficulty: 'Beginner', 
          muscleGroups: ['Cardio'],
          restTime: 30
        },
        { 
          id: '27', 
          name: 'Battle Ropes', 
          sets: 3, 
          reps: '30s', 
          completed: false, 
          difficulty: 'Advanced', 
          muscleGroups: ['Arms', 'Core', 'Cardio'],
          restTime: 60
        }
      ],
      completed: false
    },
    {
      day: 'Saturday',
      focus: 'Legs & Glutes',
      exercises: [
        { 
          id: '28', 
          name: 'Bulgarian Split Squats', 
          sets: 3, 
          reps: '12 each leg', 
          weight: 20, 
          completed: false, 
          difficulty: 'Intermediate', 
          muscleGroups: ['Quadriceps', 'Glutes'],
          instructions: 'Keep front knee aligned, control the movement',
          restTime: 75
        },
        { 
          id: '29', 
          name: 'Hip Thrusts', 
          sets: 4, 
          reps: '12-15', 
          weight: 60, 
          completed: false, 
          difficulty: 'Intermediate', 
          muscleGroups: ['Glutes', 'Hamstrings'],
          restTime: 75
        },
        { 
          id: '30', 
          name: 'Leg Curls', 
          sets: 3, 
          reps: '12-15', 
          weight: 40, 
          completed: false, 
          difficulty: 'Beginner', 
          muscleGroups: ['Hamstrings'],
          restTime: 60
        },
        { 
          id: '31', 
          name: 'Goblet Squats', 
          sets: 3, 
          reps: '15-20', 
          weight: 20, 
          completed: false, 
          difficulty: 'Beginner', 
          muscleGroups: ['Quadriceps', 'Glutes'],
          restTime: 60
        },
        { 
          id: '32', 
          name: 'Single Leg Glute Bridges', 
          sets: 3, 
          reps: '12 each leg', 
          completed: false, 
          difficulty: 'Intermediate', 
          muscleGroups: ['Glutes'],
          restTime: 45
        }
      ],
      completed: false
    }
  ]);

  const [progress, setProgress] = useState<ProgressEntry[]>([
    { 
      date: '2025-01-01', 
      weight: 75.5,
      photos: []
    },
    { 
      date: '2025-01-08', 
      weight: 75.2, 
      bodyFat: 18,
      photos: []
    },
    { 
      date: '2025-01-15', 
      weight: 74.8, 
      bodyFat: 17.5, 
      measurements: { chest: 102, waist: 85, arms: 35, thighs: 60 },
      photos: []
    }
  ]);

  const [nutritionGoals, setNutritionGoals] = useState<NutritionGoals>({
    calories: 2200,
    protein: 150,
    carbs: 220,
    fat: 80
  });

  const [weeklyStats, setWeeklyStats] = useState<WeeklyStats>({
    workoutsCompleted: 4,
    totalExercises: 32,
    completedExercises: 18,
    caloriesBurned: 2400,
    avgWorkoutDuration: 65,
    consistencyScore: 85
  });

  const completeExercise = (dayIndex: number, exerciseId: string) => {
    setWorkoutPlan(prev => {
      const newPlan = [...prev];
      const exercise = newPlan[dayIndex].exercises.find(ex => ex.id === exerciseId);
      if (exercise) {
        exercise.completed = !exercise.completed;
        newPlan[dayIndex].completed = newPlan[dayIndex].exercises.every(ex => ex.completed);
        
        // Update weekly stats
        const totalCompleted = newPlan.reduce((total, day) => 
          total + day.exercises.filter(ex => ex.completed).length, 0);
        setWeeklyStats(prev => ({
          ...prev,
          completedExercises: totalCompleted,
          workoutsCompleted: newPlan.filter(day => day.completed).length
        }));
      }
      return newPlan;
    });
  };

  const addProgressEntry = (entry: ProgressEntry) => {
    setProgress(prev => [...prev, entry].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
  };

  const updateNutritionGoals = (goals: NutritionGoals) => {
    setNutritionGoals(goals);
  };

  const addProgressPhoto = (photo: string) => {
    const today = new Date().toISOString().split('T')[0];
    setProgress(prev => {
      const existingEntry = prev.find(entry => entry.date === today);
      if (existingEntry) {
        return prev.map(entry => 
          entry.date === today 
            ? { ...entry, photos: [...(entry.photos || []), photo] }
            : entry
        );
      } else {
        return [...prev, { date: today, weight: 0, photos: [photo] }];
      }
    });
  };

  return (
    <FitnessContext.Provider value={{
      workoutPlan,
      progress,
      nutritionGoals,
      weeklyStats,
      completeExercise,
      addProgressEntry,
      updateNutritionGoals,
      addProgressPhoto
    }}>
      {children}
    </FitnessContext.Provider>
  );
}