"use client"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { useTheme } from "next-themes"

// This would come from your database in a real app
const mockData = [
  { week: "Week 1", tonnage: 12000 },
  { week: "Week 2", tonnage: 13500 },
  { week: "Week 3", tonnage: 11000 },
  { week: "Week 4", tonnage: 15000 },
  { week: "Week 5", tonnage: 16500 },
  { week: "Week 6", tonnage: 14000 },
]

export function TonnageChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={mockData}>
        <XAxis dataKey="week" stroke={isDark ? "#888888" : "#888888"} fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke={isDark ? "#888888" : "#888888"}
          fontSize={12}
          tickLine={false}
          axisLine={false}
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
        <Line
          type="monotone"
          dataKey="tonnage"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={{ fill: "hsl(var(--primary))" }}
          name="Tonnage"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

