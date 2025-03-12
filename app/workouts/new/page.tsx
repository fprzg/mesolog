"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ChevronLeft, Save, Timer } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { type Routine, getRoutines } from "@/lib/data"

type WorkoutExercise = {
  exerciseId: string
  exerciseName: string
  sets: { reps: number; weight: number; completed: boolean }[]
}

export default function NewWorkoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const routineId = searchParams.get("routineId")

  const [routine, setRoutine] = useState<Routine | null>(null)
  const [exercises, setExercises] = useState<WorkoutExercise[]>([])
  const [startTime, setStartTime] = useState<Date>(new Date())
  const [elapsedTime, setElapsedTime] = useState<string>("00:00:00")

  useEffect(() => {
    // In a real app, this would fetch the routine and its exercises
    const fetchRoutine = async () => {
      const routines = await getRoutines()
      const foundRoutine = routines.find((r) => r.id === routineId)

      if (foundRoutine) {
        setRoutine(foundRoutine)

        // Mock exercises for the routine
        setExercises([
          {
            exerciseId: "1",
            exerciseName: "Bench Press",
            sets: [
              { reps: 10, weight: 135, completed: false },
              { reps: 8, weight: 155, completed: false },
              { reps: 6, weight: 175, completed: false },
            ],
          },
          {
            exerciseId: "5",
            exerciseName: "Shoulder Press",
            sets: [
              { reps: 10, weight: 95, completed: false },
              { reps: 8, weight: 105, completed: false },
              { reps: 6, weight: 115, completed: false },
            ],
          },
          {
            exerciseId: "7",
            exerciseName: "Tricep Extension",
            sets: [
              { reps: 12, weight: 50, completed: false },
              { reps: 12, weight: 50, completed: false },
              { reps: 12, weight: 50, completed: false },
            ],
          },
        ])
      }
    }

    if (routineId) {
      fetchRoutine()
    }

    // Start the timer
    const timer = setInterval(() => {
      const now = new Date()
      const diff = now.getTime() - startTime.getTime()

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setElapsedTime(
        `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
      )
    }, 1000)

    return () => clearInterval(timer)
  }, [routineId, startTime])

  const toggleSetCompleted = (exerciseIndex: number, setIndex: number) => {
    const updatedExercises = [...exercises]
    updatedExercises[exerciseIndex].sets[setIndex].completed = !updatedExercises[exerciseIndex].sets[setIndex].completed
    setExercises(updatedExercises)
  }

  const updateSet = (exerciseIndex: number, setIndex: number, field: "reps" | "weight", value: number) => {
    const updatedExercises = [...exercises]
    updatedExercises[exerciseIndex].sets[setIndex][field] = value
    setExercises(updatedExercises)
  }

  const completeWorkout = () => {
    // In a real app, this would save the workout to your database
    console.log({
      routineId,
      routineName: routine?.name,
      date: new Date().toISOString(),
      duration: elapsedTime,
      exercises,
    })

    // Navigate back to dashboard
    router.push("/")
  }

  if (!routine) {
    return (
      <div className="container py-6">
        <h1 className="text-3xl font-bold tracking-tight">Loading workout...</h1>
      </div>
    )
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{routine.name}</h1>
        </div>
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Timer className="h-5 w-5" />
          {elapsedTime}
        </div>
      </div>

      <div className="grid gap-6">
        {exercises.map((exercise, exerciseIndex) => (
          <Card key={exerciseIndex} className="p-4">
            <h3 className="text-lg font-medium mb-4">{exercise.exerciseName}</h3>

            <div className="grid gap-4">
              <div className="grid grid-cols-12 gap-2 text-sm font-medium text-muted-foreground">
                <div className="col-span-1">Set</div>
                <div className="col-span-4">Reps</div>
                <div className="col-span-4">Weight</div>
                <div className="col-span-3">Done</div>
              </div>

              {exercise.sets.map((set, setIndex) => (
                <div
                  key={setIndex}
                  className={`grid grid-cols-12 gap-2 items-center ${set.completed ? "opacity-50" : ""}`}
                >
                  <div className="col-span-1 text-sm font-medium">{setIndex + 1}</div>
                  <div className="col-span-4">
                    <Input
                      type="number"
                      min="1"
                      value={set.reps}
                      onChange={(e) => updateSet(exerciseIndex, setIndex, "reps", Number.parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="col-span-4">
                    <Input
                      type="number"
                      min="0"
                      step="2.5"
                      value={set.weight}
                      onChange={(e) =>
                        updateSet(exerciseIndex, setIndex, "weight", Number.parseFloat(e.target.value) || 0)
                      }
                    />
                  </div>
                  <div className="col-span-3">
                    <Button
                      variant={set.completed ? "default" : "outline"}
                      className="w-full"
                      onClick={() => toggleSetCompleted(exerciseIndex, setIndex)}
                    >
                      {set.completed ? "Done" : "Mark Done"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}

        <div className="flex justify-end gap-4 pt-4">
          <Button variant="outline" asChild>
            <Link href="/">Cancel</Link>
          </Button>
          <Button onClick={completeWorkout}>
            <Save className="h-4 w-4 mr-2" />
            Complete Workout
          </Button>
        </div>
      </div>
    </div>
  )
}

