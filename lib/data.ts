export type Routine = {
  id: string
  name: string
  exerciseCount: number
  lastPerformed?: string
}

export type Exercise = {
  id: string
  name: string
  tags: string[]
}

export type Set = {
  reps: number
  weight: number
}

export type WorkoutExercise = {
  exerciseId: string
  exerciseName: string
  sets: Set[]
}

export type Workout = {
  id: string
  routineId: string
  routineName: string
  date: string
  exercises: WorkoutExercise[]
}

// Mock data functions
export async function getRoutines(): Promise<Routine[]> {
  // In a real app, this would fetch from your database
  return [
    {
      id: "1",
      name: "Push Day",
      exerciseCount: 5,
      lastPerformed: "2023-04-15",
    },
    {
      id: "2",
      name: "Pull Day",
      exerciseCount: 6,
      lastPerformed: "2023-04-17",
    },
    {
      id: "3",
      name: "Leg Day",
      exerciseCount: 4,
      lastPerformed: "2023-04-19",
    },
  ]
}

export async function getExercises(): Promise<Exercise[]> {
  return [
    { id: "1", name: "Bench Press", tags: ["chest", "push", "compound"] },
    { id: "2", name: "Squat", tags: ["legs", "compound"] },
    { id: "3", name: "Deadlift", tags: ["back", "legs", "compound"] },
    { id: "4", name: "Pull-up", tags: ["back", "pull", "compound"] },
    { id: "5", name: "Shoulder Press", tags: ["shoulders", "push", "compound"] },
    { id: "6", name: "Bicep Curl", tags: ["arms", "biceps", "isolation"] },
    { id: "7", name: "Tricep Extension", tags: ["arms", "triceps", "isolation"] },
    { id: "8", name: "Leg Press", tags: ["legs", "compound"] },
    { id: "9", name: "Lat Pulldown", tags: ["back", "pull", "compound"] },
    { id: "10", name: "Leg Curl", tags: ["legs", "hamstrings", "isolation"] },
  ]
}

