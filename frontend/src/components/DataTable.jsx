// src/components/DataTable.jsx
export default function DataTable() {
  // Sample transaction data — will later connect to MongoDB
  const rows = [
    {
      id: 1,
      book: "The Great Gatsby",
      user: "Thamindu Bandara",
      date: "2025-11-05",
      status: "Returned",
    },
    {
      id: 2,
      book: "1984",
      user: "Udari Moksha",
      date: "2025-11-07",
      status: "Borrowed",
    },
    {
      id: 3,
      book: "Pride and Prejudice",
      user: "Kavindu Perera",
      date: "2025-11-03",
      status: "Overdue",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Returned":
        return "text-emerald-600";
      case "Borrowed":
        return "text-indigo-600";
      case "Overdue":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="bg-white shadow-md border border-gray-100 rounded-xl p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4 text-indigo-700">
        Recent Borrow Transactions
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Book</th>
              <th className="p-3">User</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="p-3">{row.book}</td>
                <td className="p-3">{row.user}</td>
                <td className="p-3">{row.date}</td>
                <td className={`p-3 font-semibold ${getStatusColor(row.status)}`}>
                  {row.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
