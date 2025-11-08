// src/pages/admin/Users.jsx
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

export default function Users() {
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
                </tr>
              </thead>
              <tbody>
                <tr className="border-t hover:bg-gray-50">
                  <td className="p-3">Thamindu Bandara</td>
                  <td className="p-3">thamindu@library.com</td>
                  <td className="p-3">User</td>
                </tr>
                <tr className="border-t hover:bg-gray-50">
                  <td className="p-3">Udari Moksha</td>
                  <td className="p-3">udari@library.com</td>
                  <td className="p-3">Admin</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
