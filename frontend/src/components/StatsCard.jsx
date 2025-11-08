// src/components/StatsCard.jsx
/* eslint-disable react/prop-types */
import { statsVariants } from "../theme";

export default function StatsCard({ title, value, variant = "indigo" }) {
  const variantClass = statsVariants[variant] || variant;
  const textClass = variant === "slate" ? "text-gray-800" : "text-white";
  return (
    <div className={`relative p-4 rounded-xl ${textClass} shadow-md overflow-hidden ${variantClass}`}>
      <h3 className="text-sm uppercase tracking-wide font-semibold opacity-90">
        {title}
      </h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
