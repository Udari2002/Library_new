// src/pages/user/Dashboard.jsx
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import StatsCard from "../../components/StatsCard";
import LibraryPieChart from "../../components/PieChart";
import { Link } from "react-router-dom";

export default function UserDashboard() {
  // sample numbers for now — will wire to backend later
  const borrowedCount = 3;
  const returnedCount = 12;
  const overdueCount = 1;

  return (
    <div className="flex bg-gray-50 min-h-screen text-gray-800">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-6 space-y-6">
          <header className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-indigo-700">User Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back! Manage your borrows and explore the library.</p>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/user/books" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow">Browse Books</Link>
              <Link to="/user/borrowed" className="bg-white border border-gray-200 px-4 py-2 rounded-lg shadow">Your Borrowed</Link>
            </div>
          </header>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatsCard title="Your Borrowed Books" value={borrowedCount} color="bg-indigo-600" />
                <StatsCard title="Your Returned Books" value={returnedCount} color="bg-emerald-500" />
                <StatsCard title="Overdue" value={overdueCount} color="bg-red-500" />
              </div>

              <div className="bg-white rounded-xl shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Quick Actions</h2>
                  <div className="text-sm text-gray-500">Manage your activity</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link to="/user/borrowed" className="p-4 border rounded-lg hover:shadow">Your Borrowed Book List</Link>
                  <Link to="/user/returned" className="p-4 border rounded-lg hover:shadow">Your Returned Book List</Link>
                  <Link to="/user/books" className="p-4 border rounded-lg hover:shadow">Browse Inventory</Link>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow p-6">
                <blockquote className="text-gray-700 italic">“Embarking on the journey of reading fosters personal growth, nurturing a path towards excellence and the refinement of character.”</blockquote>
                <div className="mt-4 text-sm text-gray-500">— BookWorm</div>
              </div>
            </div>

            <aside className="space-y-6">
              <LibraryPieChart />
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}
