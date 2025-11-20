import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    createdAt: ""
  });

  const [showModal, setShowModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const loadProfile = async () => {
    const res = await API.get("/user/profile");
    setProfile(res.data);
  };

const changePasswordHandler = async () => {
  if (!currentPassword || !newPassword) {
    return alert("Both fields are required");
  }

  try {
    const res = await API.put("/user/change-password", {
      currentPassword,
      newPassword,
    });

    alert(res.data.message);
    setShowModal(false);
    setCurrentPassword("");
    setNewPassword("");
  } catch (error) {
    alert(error.response?.data?.message || "Password update failed");
  }
};


  const getInitials = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">

        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-blue-600 text-white text-4xl rounded-full flex items-center justify-center font-bold">
            {getInitials(profile.name)}
          </div>

          <h2 className="text-2xl font-bold mt-4">{profile.name}</h2>
          <p className="text-gray-600">{profile.email}</p>

          <p className="text-xs text-gray-400 mt-2">
            Member since: {new Date(profile.createdAt).toLocaleDateString()}
          </p>

          <button
            onClick={() => setShowModal(true)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Change Password
          </button>
        </div>
      </div>

      {/* Password Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Change Password</h2>

            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full border p-2 rounded mb-3"
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border p-2 rounded mb-3"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={changePasswordHandler}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
