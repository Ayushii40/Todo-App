import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6 sm:p-8 max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Dashboard</h2>
        <p className="text-gray-700 mb-6">
          Overview of your account. Use the navigation above to manage tasks and view your profile.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold mb-2">Tasks</h3>
            <p className="text-sm text-gray-600">
              Create and manage your personal to-do list on the Tasks page.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold mb-2">Profile</h3>
            <p className="text-sm text-gray-600">
              View your profile information fetched securely from the backend.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
