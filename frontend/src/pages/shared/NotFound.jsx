export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center">
      <h1 className="text-5xl font-bold text-indigo-700 mb-4">404</h1>
      <p className="text-gray-600 mb-6">Page not found.</p>
      <a
        href="/"
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
      >
        Go Home
      </a>
    </div>
  );
}
