// src/pages/admin/Users.jsx
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";

export default function Users() {
  const { api, user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      try {
        const res = await api.get('/auth/list');
        if (!mounted) return;
        setUsers(res.data || []);
      } catch (err) {
        console.error('Failed to load users', err);
      }
    };
    if (user?.role === 'admin') fetch();
    return () => (mounted = false);
  }, [api, user]);

  return (
    <div className="flex bg-gray-50 min-h-screen text-gray-800">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 space-y-6">
          <h1 className="text-3xl font-bold text-indigo-700">Users</h1>

          <div className="bg-white rounded-xl shadow border border-gray-100 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Last Login</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{u.name}</td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3">{u.role}</td>
                    <td className="p-3">{u.lastLogin ? new Date(u.lastLogin).toLocaleString() : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
