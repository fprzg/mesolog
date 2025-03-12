"use client"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { useTheme } from "next-themes"

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

// This would come from your database in a real app
const mockData = [
  { day: "Mon", workouts: 1 },
  { day: "Tue", workouts: 0 },
  { day: "Wed", workouts: 1 },
  { day: "Thu", workouts: 0 },
  { day: "Fri", workouts: 1 },
  { day: "Sat", workouts: 0 },
  { day: "Sun", workouts: 0 },
]

export function WeeklyWorkoutChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={mockData}>
        <XAxis dataKey="day" stroke={isDark ? "#888888" : "#888888"} fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke={isDark ? "#888888" : "#888888"}
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar dataKey="workouts" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} maxBarSize={50} />
      </BarChart>
    </ResponsiveContainer>
  )
}

