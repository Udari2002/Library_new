// src/components/PieChart.jsx
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function LibraryPieChart() {
  // Sample static data — later, we’ll replace with backend data
  const data = [
    { name: "Borrowed", value: 342 },
    { name: "Returned", value: 288 },
    { name: "Overdue", value: 14 },
  ];

  const COLORS = ["#4f46e5", "#10b981", "#ef4444"]; // indigo, emerald, red

  return (
    <div className="bg-white shadow-md border border-gray-100 rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4 text-indigo-700">
        Book Status Summary
      </h2>

      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#4f46e5"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
