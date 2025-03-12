"use client"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { useTheme } from "next-themes"

// This would come from your database in a real app
const mockData = [
  { week: "Week 1", volume: 1200 },
  { week: "Week 2", volume: 1350 },
  { week: "Week 3", volume: 1100 },
  { week: "Week 4", volume: 1500 },
  { week: "Week 5", volume: 1650 },
  { week: "Week 6", volume: 1400 },
]

export function VolumeChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={mockData}>
        <XAxis dataKey="week" stroke={isDark ? "#888888" : "#888888"} fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke={isDark ? "#888888" : "#888888"}
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "hsl(var(--background))" : "hsl(var(--background))",
            borderColor: "hsl(var(--border))",
          }}
          labelStyle={{
            color: isDark ? "hsl(var(--foreground))" : "hsl(var(--foreground))",
          }}
        />
        <Bar dataKey="volume" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} maxBarSize={50} name="Volume" />
      </BarChart>
    </ResponsiveContainer>
  )
}

