// src/pages/admin/Dashboard.jsx
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import StatsCard from "../../components/StatsCard";
import LibraryPieChart from "../../components/PieChart";
import DataTable from "../../components/DataTable";

export default function Dashboard() {
  return (
    <div className="flex bg-gray-50 min-h-screen text-gray-800">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-6 flex-1 overflow-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-indigo-700">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Overview of library activity and inventory.</p>
            </div>
          </div>

          <section className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
            {/* decorative gradient shapes */}
            <div className="gradient-blob gradient-blob--large" style={{ left: -80, top: -40, background: 'linear-gradient(135deg,#eef2ff,#f8fafc)' }} />
            <div className="gradient-blob gradient-blob--medium" style={{ right: -40, bottom: -20, background: 'linear-gradient(135deg,#f1f5f9,#ffffff)' }} />

            <div className="lg:col-span-2 space-y-6 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatsCard title="Total Books" value="1,230" variant="bg-gradient-to-br from-indigo-600 to-indigo-500" />
                <StatsCard title="Borrowed Books" value="342" variant="bg-gradient-to-br from-emerald-400 to-emerald-300" />
                <StatsCard title="Overdue Books" value="14" variant="bg-gradient-to-br from-rose-500 to-rose-400" />
              </div>

              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-lg font-semibold mb-2 text-indigo-600">Recent Borrow Records</h2>
                <p className="text-gray-600 text-sm">List of latest borrow and return transactions.</p>
              </div>

              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-lg font-semibold mb-2 text-indigo-600">Quick Insights</h2>
                <p className="text-gray-600 text-sm">Summary cards, alerts, and quick actions will appear here.</p>
              </div>
            </div>

            <aside className="space-y-6 relative z-10">
              <LibraryPieChart />
              <DataTable />
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}
