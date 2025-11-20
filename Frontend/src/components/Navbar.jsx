import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-4 sm:px-6 py-3 flex justify-between items-center">
      <h1 className="font-bold text-lg sm:text-xl">To-Do App</h1>
      <div className="flex gap-3 sm:gap-4 items-center text-sm sm:text-base">
        <Link to="/" className="hover:text-gray-200">Dashboard</Link>
        <Link to="/tasks" className="hover:text-gray-200">Tasks</Link>
        <Link to="/profile" className="hover:text-gray-200">Profile</Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-xs sm:text-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
