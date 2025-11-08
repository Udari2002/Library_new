// src/components/PieChart.jsx
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { chartColors } from "../theme";

export default function LibraryPieChart({ data = null }) {
  // Sample static data — later, we’ll replace with backend data
  const defaultData = [
    { name: "Borrowed", value: 342 },
    { name: "Returned", value: 288 },
    { name: "Overdue", value: 14 },
  ];

  const displayData = data || defaultData;

  return (
    <div className="bg-white shadow-md border border-gray-100 rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-3 text-indigo-700">Book Status Summary</h2>

      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={displayData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="45%"
            outerRadius={70}
            fill={chartColors[0]}
            label={false}
            labelLine={false}
          >
            {displayData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
