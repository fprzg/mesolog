import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Calendar, LineChart } from "lucide-react"
import { VolumeChart } from "@/components/volume-chart"
import { TonnageChart } from "@/components/tonnage-chart"
import { ExerciseProgressChart } from "@/components/exercise-progress-chart"

export default function HistoryPage() {
  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Workout History</h1>

      <Tabs defaultValue="volume">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="volume">Volume</TabsTrigger>
          <TabsTrigger value="tonnage">Tonnage</TabsTrigger>
          <TabsTrigger value="exercises">Exercises</TabsTrigger>
        </TabsList>

        <TabsContent value="volume" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                Weekly Volume
              </CardTitle>
              <CardDescription>Total sets × reps per week</CardDescription>
            </CardHeader>
            <CardContent>
              <VolumeChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tonnage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5" />
                Weekly Tonnage
              </CardTitle>
              <CardDescription>Total weight lifted per week</CardDescription>
            </CardHeader>
            <CardContent>
              <TonnageChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exercises" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Exercise Progress
              </CardTitle>
              <CardDescription>Track your progress for specific exercises</CardDescription>
            </CardHeader>
            <CardContent>
              <ExerciseProgressChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

