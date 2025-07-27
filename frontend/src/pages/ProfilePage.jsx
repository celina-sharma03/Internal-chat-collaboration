import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import Navbar from "../components/Navbar";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-200 animate-gradient-xy"></div>

      {/* Blurred Floating Blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-400 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-0 w-72 h-72 bg-purple-400 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-20 w-72 h-72 bg-pink-400 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* Navbar */}
      <Navbar toggleDarkMode={toggleDarkMode} />

      {/* Main Content */}
      <main className="relative flex justify-center items-start pt-28 pb-12 px-4 z-10">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-gray-200 p-8 space-y-8">
          {/* Heading */}
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-bold text-gray-800">
              Your Profile
            </h1>
            <p className="text-sm text-gray-500">
              Manage your account details and photo
            </p>
          </div>

          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser?.profilePic || "/avatar.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-700
                p-2 rounded-full cursor-pointer transition border-2 border-white shadow ${
                  isUpdatingProfile ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                <Camera className="w-4 h-4 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">
              {isUpdatingProfile
                ? "Uploading..."
                : "Tap the camera icon to update your photo"}
            </p>
          </div>

          {/* User Info */}
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase tracking-wide">
                <User className="w-4 h-4" />
                Full Name
              </label>
              <div className="mt-1 px-4 py-2.5 bg-gray-100 rounded-xl border border-gray-300 text-gray-800">
                {authUser?.fullName || "Your Name"}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase tracking-wide">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <div className="mt-1 px-4 py-2.5 bg-gray-100 rounded-xl border border-gray-300 text-gray-800">
                {authUser?.email || "your@email.com"}
              </div>
            </div>
          </div>

          {/* Account Info */}
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-gray-700">
              Account Info
            </h2>
            <div className="flex justify-between py-1 border-b border-gray-200 text-sm">
              <span className="text-gray-600">Member Since</span>
              <span className="text-gray-800">
                {authUser?.createdAt?.split("T")[0] || "N/A"}
              </span>
            </div>
            <div className="flex justify-between py-1 text-sm">
              <span className="text-gray-600">Status</span>
              <span className="text-green-600 font-medium">Active</span>
            </div>
          </div>

          {/* Action */}
          <div className="pt-4 text-center">
            <button className="inline-block px-6 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition">
              Edit Profile
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
