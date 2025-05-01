import '../styles/globals.css';
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Apollo Clone</h1>
      <p className="text-lg text-gray-600 mb-6">
        Explore top doctors and book appointments easily.
      </p>
      <a
        href="/specialties/general-physician"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        View General Physicians
      </a>
    </main>
  );
}
