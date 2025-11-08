import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

export default function Overdue() {
	return (
		<div className="flex bg-gray-50 min-h-screen text-gray-800">
			<Sidebar />
			<div className="flex-1 flex flex-col">
				<Navbar />
				<main className="p-6 space-y-6">
					<h1 className="text-3xl font-bold text-indigo-700">Overdue</h1>
					<p className="text-gray-600">List of overdue books will appear here.</p>
				</main>
			</div>
		</div>
	);
}
