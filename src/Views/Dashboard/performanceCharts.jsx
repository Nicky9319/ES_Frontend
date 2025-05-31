import { ChevronRight, LineChart, User } from "lucide-react";
import React, { useEffect, useState } from "react";

// Import only the needed components from recharts
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  Pie,
  PieChart,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Color constants for consistent styling
const COLORS = {
  primary: "#292B35",
  secondary: "#35383f",
  accent1: "#95C5C5",
  accent2: "#EE8631",
  accent3: "#AD662F",
  text: "#E0E0E0",
  textSecondary: "#A0A0A0",
};

// Generate dummy data
const generateDummyData = (days) => {
  const data = [];
  const today = new Date();

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);

    data.push({
      date: date.toISOString().split("T")[0],
      avgCombatScore: 150 + Math.floor(Math.random() * 150),
      kdRatio: (0.8 + Math.random() * 2).toFixed(2),
      econRating: Math.floor(50 + Math.random() * 100),
      firstBloods: Math.floor(Math.random() * 5),
      matchesPlayed: Math.floor(1 + Math.random() * 5),
      winRate: Math.floor(40 + Math.random() * 60),
      headshots: Math.floor(30 + Math.random() * 40),
      agentPlayed: ["Jett", "Reyna", "Omen", "Killjoy", "Sage"][
        Math.floor(Math.random() * 5)
      ],
    });
  }
  return data;
};

// Generate a full year of data
const fullYearData = generateDummyData(365);

const PerformanceCharts = () => {
  // Performance dashboard states
  const [timeRange, setTimeRange] = useState("last7days");
  const [data, setData] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState("avgCombatScore");

  // Time ranges mapping
  const timeRanges = {
    today: { label: "Today", days: 0 },
    yesterday: { label: "Yesterday", days: 1 },
    last7days: { label: "Last 7 Days", days: 7 },
    lastMonth: { label: "Last 1 Month", days: 30 },
    last6Months: { label: "Last 6 Months", days: 180 },
    lastYear: { label: "Last 1 Year", days: 365 },
  };

  // Metrics options
  const metrics = [
    { value: "avgCombatScore", label: "Avg Combat Score" },
    { value: "kdRatio", label: "K/D Ratio" },
    { value: "econRating", label: "Econ Rating" },
    { value: "firstBloods", label: "First Bloods" },
    { value: "winRate", label: "Win Rate" },
    { value: "headshots", label: "Headshots %" },
  ];

  useEffect(() => {
    // Filter data based on selected time range
    const filterData = () => {
      const days = timeRanges[timeRange].days;

      if (days === 0) {
        // Just today's data
        setData(fullYearData.slice(-1));
      } else if (days === 1) {
        // Just yesterday's data
        setData(fullYearData.slice(-2, -1));
      } else {
        // Last X days
        setData(fullYearData.slice(-(days + 1)));
      }
    };

    filterData();
  }, [timeRange]);

  // Get agent usage data for pie chart
  const getAgentUsageData = () => {
    const agentCounts = {};
    data.forEach((match) => {
      agentCounts[match.agentPlayed] =
        (agentCounts[match.agentPlayed] || 0) + 1;
    });

    return Object.keys(agentCounts).map((agent) => ({
      name: agent,
      value: agentCounts[agent],
    }));
  };

  // Format date for x-axis
  const formatDateChart = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Component for section headers
  const SectionHeader = ({ icon, title }) => (
    <div className="flex items-center gap-2 mb-3">
      <div className="text-[#95C5C5]">{icon}</div>
      <h2 className="font-semibold text-sm">{title}</h2>
    </div>
  );

  return (
    <div>
      <div className=" bg-[#292B35] text-[#E0E0E0] p-4">
        <div className="grid grid-cols-12 gap-4">
          {/* Performance Chart - Now takes 9 columns (3/4) */}
          <div className="col-span-9 bg-[#35383f] rounded-xl border border-[#95C5C5]/10 p-4 shadow-lg">
            <div className="flex justify-between items-center mb-3">
              <SectionHeader
                icon={<LineChart size={16} />}
                title="PERFORMANCE TREND"
              />
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="text-gray-400 text-xs flex items-center hover:text-gray-300"
                >
                  {timeRanges[timeRange].label}
                  <ChevronRight size={12} />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-[#292B35] border border-[#95C5C5]/20 rounded-md shadow-lg z-10">
                    {Object.entries(timeRanges).map(([key, value]) => (
                      <button
                        key={key}
                        onClick={() => {
                          setTimeRange(key);
                          setIsDropdownOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-xs text-gray-400 hover:bg-[#35383f] ${
                          key === timeRange ? "font-semibold" : ""
                        }`}
                      >
                        {value.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <ResponsiveContainer width="100%" height={200}>
              <RechartsLineChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#95C5C5"
                  opacity={0.1}
                />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatDateChart}
                  stroke="#A0A0A0"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis stroke="#A0A0A0" tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#292B35",
                    color: "#E0E0E0",
                  }}
                  itemStyle={{ color: "#E0E0E0" }}
                />
                <Legend wrapperStyle={{ bottom: 0 }} />
                <Line
                  type="monotone"
                  dataKey={selectedMetric}
                  stroke="#EE8631"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 8 }}
                  name={metrics.find((m) => m.value === selectedMetric)?.label}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
            
            
            <div className="mt-2">
              <select
                className="bg-[#292B35] border border-[#95C5C5]/20 rounded p-2 text-xs text-gray-400 w-full"
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
              >
                {metrics.map((metric) => (
                  <option key={metric.value} value={metric.value}>
                    {metric.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Agent Usage - Now takes 3 columns (1/4) */}
          <div className="col-span-3 bg-[#35383f] rounded-xl border border-[#95C5C5]/10 p-4 shadow-lg">
            <SectionHeader icon={<User size={16} />} title="AGENT USAGE" />
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={getAgentUsageData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill={COLORS.accent1}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) =>
                    percent > 0.05
                      ? `${name} ${(percent * 100).toFixed(0)}%`
                      : null
                  }
                >
                  {getAgentUsageData().map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        COLORS[["accent1", "accent2", "accent3"][index % 3]]
                      }
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: COLORS.secondary,
                    color: COLORS.text,
                  }}
                  itemStyle={{ color: COLORS.text }}
                />
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  wrapperStyle={{ color: COLORS.textSecondary }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceCharts;
