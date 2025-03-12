import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Edit, Play } from "lucide-react"
import Link from "next/link"
import { WeeklyWorkoutChart } from "@/components/weekly-workout-chart"
import { getRoutines } from "@/lib/data"

export default async function Dashboard() {
  const routines = await getRoutines()

  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button asChild>
          <Link href="/routines/new">Create Routine</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Weekly Progress
          </CardTitle>
          <CardDescription>Your workout activity for the current week</CardDescription>
        </CardHeader>
        <CardContent>
          <WeeklyWorkoutChart />
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold tracking-tight mt-6">Your Routines</h2>

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
              <Button variant="outline" size="sm" asChild>
                <Link href={`/routines/${routine.id}/edit`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href={`/workouts/new?routineId=${routine.id}`}>
                  <Play className="h-4 w-4 mr-2" />
                  Start
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}

        {routines.length === 0 && (
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>No routines yet</CardTitle>
              <CardDescription>Create your first workout routine to get started</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild>
                <Link href="/routines/new">Create Routine</Link>
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}

