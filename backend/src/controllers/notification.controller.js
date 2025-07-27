// controllers/notification.controller.js
import User from "../models/user.model.js";

export const getNotificationPreferences = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("notificationPreferences");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.notificationPreferences || {});
  } catch (err) {
    res.status(500).json({ message: "Error fetching preferences" });
  }
};

export const updateNotificationPreferences = async (req, res) => {
  try {
    const { emailNotifications, smsAlerts } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { notificationPreferences: { emailNotifications, smsAlerts } },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Preferences updated" });
  } catch (err) {
    res.status(500).json({ message: "Error updating preferences" });
  }
};
