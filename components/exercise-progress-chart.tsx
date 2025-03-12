"use client"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts"
import { useTheme } from "next-themes"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

// This would come from your database in a real app
const mockData = [
  { date: "Jan 1", weight: 135, reps: 8 },
  { date: "Jan 8", weight: 145, reps: 8 },
  { date: "Jan 15", weight: 145, reps: 10 },
  { date: "Jan 22", weight: 155, reps: 8 },
  { date: "Jan 29", weight: 155, reps: 10 },
  { date: "Feb 5", weight: 165, reps: 8 },
]

export function ExerciseProgressChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [selectedExercise, setSelectedExercise] = useState("bench-press")

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Select value={selectedExercise} onValueChange={setSelectedExercise}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select exercise" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bench-press">Bench Press</SelectItem>
            <SelectItem value="squat">Squat</SelectItem>
            <SelectItem value="deadlift">Deadlift</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={mockData}>
          <XAxis
            dataKey="date"
            stroke={isDark ? "#888888" : "#888888"}
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke={isDark ? "#888888" : "#888888"}
            fontSize={12}
            tickLine={false}
            axisLine={false}
            yAxisId="left"
            tickFormatter={(value) => `${value}`}
          />
          <YAxis
            stroke={isDark ? "#888888" : "#888888"}
            fontSize={12}
            tickLine={false}
            axisLine={false}
            yAxisId="right"
            orientation="right"
            tickFormatter={(value) => `${value}`}
          />
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "hsl(var(--muted))" : "hsl(var(--muted))"} />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "hsl(var(--background))" : "hsl(var(--background))",
              borderColor: "hsl(var(--border))",
            }}
            labelStyle={{
              color: isDark ? "hsl(var(--foreground))" : "hsl(var(--foreground))",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={{ fill: "hsl(var(--primary))" }}
            yAxisId="left"
            name="Weight"
          />
          <Line
            type="monotone"
            dataKey="reps"
            stroke="hsl(var(--destructive))"
            strokeWidth={2}
            dot={{ fill: "hsl(var(--destructive))" }}
            yAxisId="right"
            name="Reps"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

