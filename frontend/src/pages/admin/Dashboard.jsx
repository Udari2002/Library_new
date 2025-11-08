// src/pages/admin/Dashboard.jsx
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import StatsCard from "../../components/StatsCard";
import LibraryPieChart from "../../components/PieChart";
import DataTable from "../../components/DataTable";
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Dashboard() {
  const [totalBooks, setTotalBooks] = useState(null);
  const [borrowedCount, setBorrowedCount] = useState(null);
  const [overdueCount, setOverdueCount] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchCounts = async () => {
      try {
        const booksRes = await api.get("/books");
        const books = booksRes.data || [];
        if (!mounted) return;
        setTotalBooks(books.length);
        const totalBorrowed = books.reduce((acc, b) => acc + ((b.totalCopies || 0) - (b.copiesAvailable || 0)), 0);
        setBorrowedCount(totalBorrowed);
      } catch (err) {
        console.error("Failed to fetch books:", err?.response?.status || err.message || err);
        if (mounted) {
          setTotalBooks("—");
          setBorrowedCount("—");
        }
      }

      try {
        const overdueRes = await api.get("/borrows/overdue");
        if (!mounted) return;
        const overdue = overdueRes.data || [];
        setOverdueCount(overdue.length);
      } catch (err) {
        console.error("Failed to fetch overdue:", err?.response?.status || err.message || err);
        if (mounted) setOverdueCount("—");
      }
    };

    fetchCounts();
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <div className="flex bg-gray-50 min-h-screen text-gray-800">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-4 flex-1 overflow-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-2xl font-bold text-indigo-700">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1 text-sm">Overview of library activity and inventory.</p>
            </div>
          </div>

          <section className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
            {/* decorative gradient shapes */}
            <div className="gradient-blob gradient-blob--large" style={{ left: -80, top: -40, background: 'linear-gradient(135deg,#eef2ff,#f8fafc)' }} />
            <div className="gradient-blob gradient-blob--medium" style={{ right: -40, bottom: -20, background: 'linear-gradient(135deg,#f1f5f9,#ffffff)' }} />

            <div className="lg:col-span-2 space-y-4 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <StatsCard title="Total Books" value={totalBooks ?? '—'} variant="indigo" />
                <StatsCard title="Borrowed Books" value={borrowedCount ?? '—'} variant="emerald" />
                <StatsCard title="Overdue Books" value={overdueCount ?? '—'} variant="rose" />
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

// Fetch counts for admin dashboard
function useAdminCounts(setters) {
  // This helper is intentionally empty — used via useEffect inside component
}
