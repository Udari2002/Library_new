// src/pages/admin/Dashboard.jsx
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import StatsCard from "../../components/StatsCard";

export default function Dashboard() {
  return (
    <div className="flex bg-gray-50 min-h-screen text-gray-800">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-6 space-y-6">
          <h1 className="text-3xl font-bold text-indigo-700">Dashboard</h1>

          {/* Statistic cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard title="Total Books" value="1,230" color="bg-indigo-600" />
            <StatsCard title="Borrowed Books" value="342" color="bg-emerald-500" />
            <StatsCard title="Returned Books" value="288" color="bg-blue-500" />
            <StatsCard title="Overdue Books" value="14" color="bg-red-500" />
          </div>

          {/* Recent Section */}
          <section className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-4 text-indigo-600">
              Recent Borrow Records
            </h2>
            <p className="text-gray-600">
              This section will later display recent borrow and return transactions.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
