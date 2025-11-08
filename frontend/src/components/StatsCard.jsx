// src/components/StatsCard.jsx
/* eslint-disable react/prop-types */
export default function StatsCard({ title, value, variant = "bg-gradient-to-br from-indigo-600 to-indigo-500" }) {
  return (
    <div className={`p-4 rounded-xl text-white shadow-md ${variant}`}>
      <h3 className="text-sm uppercase tracking-wide font-semibold opacity-90">
        {title}
      </h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
