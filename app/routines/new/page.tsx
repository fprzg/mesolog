"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { type Exercise, getExercises } from "@/lib/data"
import { ChevronLeft, Plus, Save, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type RoutineExercise = {
  exerciseId: string
  exerciseName: string
  sets: { reps: number; weight: number }[]
}

export default function NewRoutinePage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [routineExercises, setRoutineExercises] = useState<RoutineExercise[]>([])
  const [selectedExerciseId, setSelectedExerciseId] = useState("")

  useEffect(() => {
    // In a real app, this would be a server action or API call
    const fetchExercises = async () => {
      const data = await getExercises()
      setExercises(data)
      if (data.length > 0) {
        setSelectedExerciseId(data[0].id)
      }
    }

    fetchExercises()
  }, [])

  const addExercise = () => {
    const exercise = exercises.find((e) => e.id === selectedExerciseId)
    if (!exercise) return

    setRoutineExercises([
      ...routineExercises,
      {
        exerciseId: exercise.id,
        exerciseName: exercise.name,
        sets: [{ reps: 10, weight: 0 }],
      },
    ])
  }

  const addSet = (exerciseIndex: number) => {
    const updatedExercises = [...routineExercises]
    const lastSet = updatedExercises[exerciseIndex].sets[updatedExercises[exerciseIndex].sets.length - 1]
    updatedExercises[exerciseIndex].sets.push({ ...lastSet })
    setRoutineExercises(updatedExercises)
  }

  const removeSet = (exerciseIndex: number, setIndex: number) => {
    const updatedExercises = [...routineExercises]
    updatedExercises[exerciseIndex].sets.splice(setIndex, 1)
    setRoutineExercises(updatedExercises)
  }

  const removeExercise = (index: number) => {
    const updatedExercises = [...routineExercises]
    updatedExercises.splice(index, 1)
    setRoutineExercises(updatedExercises)
  }

  const updateSet = (exerciseIndex: number, setIndex: number, field: "reps" | "weight", value: number) => {
    const updatedExercises = [...routineExercises]
    updatedExercises[exerciseIndex].sets[setIndex][field] = value
    setRoutineExercises(updatedExercises)
  }

  const saveRoutine = () => {
    // In a real app, this would save to your database
    console.log({
      name,
      exercises: routineExercises,
    })

    // Navigate back to routines page
    router.push("/routines")
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/routines">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Create New Routine</h1>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="routine-name">Routine Name</Label>
          <Input
            id="routine-name"
            placeholder="Push Day, Leg Day, etc."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="grid gap-3">
          <Label>Add Exercises</Label>
          <div className="flex gap-2">
            <Select value={selectedExerciseId} onValueChange={setSelectedExerciseId}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select an exercise" />
              </SelectTrigger>
              <SelectContent>
                {exercises.map((exercise) => (
                  <SelectItem key={exercise.id} value={exercise.id}>
                    {exercise.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={addExercise}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </div>

        {routineExercises.length > 0 && (
          <div className="grid gap-6">
            <h2 className="text-xl font-semibold">Exercises</h2>

            {routineExercises.map((exercise, exerciseIndex) => (
              <Card key={exerciseIndex} className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">{exercise.exerciseName}</h3>
                  <Button variant="ghost" size="icon" onClick={() => removeExercise(exerciseIndex)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid gap-4">
                  <div className="grid grid-cols-12 gap-2 text-sm font-medium text-muted-foreground">
                    <div className="col-span-1">Set</div>
                    <div className="col-span-5">Reps</div>
                    <div className="col-span-5">Weight</div>
                    <div className="col-span-1"></div>
                  </div>

                  {exercise.sets.map((set, setIndex) => (
                    <div key={setIndex} className="grid grid-cols-12 gap-2 items-center">
                      <div className="col-span-1 text-sm font-medium">{setIndex + 1}</div>
                      <div className="col-span-5">
                        <Input
                          type="number"
                          min="1"
                          value={set.reps}
                          onChange={(e) =>
                            updateSet(exerciseIndex, setIndex, "reps", Number.parseInt(e.target.value) || 0)
                          }
                        />
                      </div>
                      <div className="col-span-5">
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
                      <div className="col-span-1">
                        {exercise.sets.length > 1 && (
                          <Button variant="ghost" size="icon" onClick={() => removeSet(exerciseIndex, setIndex)}>
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}

                  <Button variant="outline" onClick={() => addSet(exerciseIndex)} className="mt-2">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Set
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="flex justify-end gap-4 pt-4">
          <Button variant="outline" asChild>
            <Link href="/routines">Cancel</Link>
          </Button>
          <Button onClick={saveRoutine} disabled={!name || routineExercises.length === 0}>
            <Save className="h-4 w-4 mr-2" />
            Save Routine
          </Button>
        </div>
      </div>
    </div>
  )
}

