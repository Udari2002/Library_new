// src/components/StatsCard.jsx
export default function StatsCard({ title, value, color = "bg-indigo-600" }) {
  return (
    <div className={`p-4 rounded-xl text-white shadow-md ${color}`}>
      <h3 className="text-sm uppercase tracking-wide font-semibold opacity-90">
        {title}
      </h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
