import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Plus, Trash } from "lucide-react"
import Link from "next/link"
import { getRoutines } from "@/lib/data"

export default async function RoutinesPage() {
  const routines = await getRoutines()

  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Routines</h1>
        <Button asChild>
          <Link href="/routines/new">
            <Plus className="h-4 w-4 mr-2" />
            New Routine
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {routines.map((routine) => (
          <Card key={routine.id}>
            <CardHeader>
              <CardTitle>{routine.name}</CardTitle>
              <CardDescription>{routine.exerciseCount} exercises</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Last performed: {routine.lastPerformed || "Never"}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/routines/${routine.id}/edit`}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Link>
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
              <Button size="sm" asChild>
                <Link href={`/workouts/new?routineId=${routine.id}`}>Start Workout</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

