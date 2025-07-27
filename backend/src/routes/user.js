import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import User from "../models/user.model.js"; 

const router = express.Router();

router.delete("/delete-account", protectRoute, async (req, res) => {
  try {
    const userId = req.user._id; 

    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("Account deletion failed:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
