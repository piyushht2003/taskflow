"use client";

import { useTheme } from "next-themes";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface GrowthData {
  date: string;
  users: number;
  workspaces: number;
}

export function GrowthChart({ data }: { data: GrowthData[] }) {
  const { theme } = useTheme();

  const isDark = theme === "dark";

  return (
    <div className="h-[350px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorWorkspaces" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            stroke={isDark ? "#525252" : "#e5e5e5"}
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => {
              const date = new Date(value);
              return `${date.getDate()}/${date.getMonth() + 1}`;
            }}
          />
          <YAxis
            stroke={isDark ? "#525252" : "#e5e5e5"}
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "#171717" : "#ffffff",
              border: `1px solid ${isDark ? "#262626" : "#e5e5e5"}`,
              borderRadius: "8px",
            }}
          />
          <Area
            type="monotone"
            dataKey="users"
            name="New Users"
            stroke="#3b82f6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorUsers)"
          />
          <Area
            type="monotone"
            dataKey="workspaces"
            name="New Workspaces"
            stroke="#10b981"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorWorkspaces)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
