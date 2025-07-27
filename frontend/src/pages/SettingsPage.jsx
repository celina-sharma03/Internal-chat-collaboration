import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Notifications from "../components/Notification";
import axios from "axios";

const sections = [
  {
    key: "notifications",
    title: "Notifications",
    fields: [
      {
        label: "Email Notifications",
        name: "emailNotif",
        placeholder: "Enabled",
      },
      { label: "SMS Alerts", name: "smsNotif", placeholder: "Disabled" },
    ],
  },
];

const toastVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  exit: { opacity: 0, y: 30, transition: { duration: 0.3 } },
};

export default function SettingsPage() {
  const [formData, setFormData] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState({ email: "", reason: "" });
  const [accountDeleted, setAccountDeleted] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  const handleChange = (e, sectionKey) => {
    setFormData((prev) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleDeleteAccount = async () => {
    try {
      const res = await axios.delete(
        "http://localhost:5001/api/user/delete-account",
        {
          withCredentials: true,
          data: deleteInfo, // Send email and reason in body (axios allows this)
        }
      );

      setAccountDeleted(true);
      setShowToast(true);
      setConfirmModal(false);
      setTimeout(() => {
        setShowToast(false);
        window.location.href = "/login";
      }, 1500);
    } catch (err) {
      console.error(
        "Account deletion failed:",
        err.response?.data || err.message
      );
      alert("Failed to delete account.");
    }
  };

  return (
    <div className="min-h-screen p-6 pt-36 backdrop-blur-md animate-fade-in dark:bg-gradient-to-br from-[#fef1f5] to-[#e6f3ff]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Sidebar */}
        <div className="bg-white rounded-2xl shadow-md p-4">
          <h2 className="text-2xl font-semibold text-[#4A4A4A] mb-4">
            Settings
          </h2>
          <ul className="space-y-2 text-[#5f5f5f]">
            <li className="text-l hover:text-[#908ebb] cursor-pointer">
              Notifications
            </li>
            <li className="text-l hover:text-red-500 cursor-pointer">
              Delete Account
            </li>
          </ul>
        </div>

        {/* Content Area */}
        <div className="md:col-span-2 space-y-6">
          {/* Notification Section */}
          <motion.div
            className="bg-white rounded-2xl p-6 shadow-md border border-white-300"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
          <Notifications />
          </motion.div>

          {/* Delete Account Section */}
          <motion.div
            className="bg-white rounded-2xl p-6 shadow-md border border-white-300"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-gray-600 mb-4">
              Delete Account
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              This action is irreversible. Please confirm your email and let us
              know why you're leaving.
            </p>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email to confirm"
                value={deleteInfo.email}
                disabled={accountDeleted}
                onChange={(e) =>
                  setDeleteInfo({ ...deleteInfo, email: e.target.value })
                }
                className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white/80 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black-400 disabled:opacity-50"
              />
              <textarea
                rows="4"
                placeholder="Why are you deleting your account?"
                value={deleteInfo.reason}
                disabled={accountDeleted}
                onChange={(e) =>
                  setDeleteInfo({ ...deleteInfo, reason: e.target.value })
                }
                className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white/80 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black-400 disabled:opacity-50"
              />
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setConfirmModal(true)}
                disabled={accountDeleted}
                className={`mt-2 px-4 py-2 ${
                  accountDeleted ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"
                } text-white rounded-lg shadow transition disabled:cursor-not-allowed`}
              >
                {accountDeleted ? "Account Deleted" : "Delete Account"}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            variants={toastVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
          >
            {accountDeleted
              ? "Account deleted."
              : "Changes saved successfully!"}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Confirmation */}
      <AnimatePresence>
        {confirmModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg"
            >
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Are you sure?
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                This will permanently delete your account. This action cannot be
                undone.
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setConfirmModal(false)}
                  className="px-4 py-2 bg-gray-500 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
