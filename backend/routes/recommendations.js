import express from "express";
import Recommendation from "../models/Recommendation.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const recommendations = await Recommendation.find()
      .sort({ createdAt: -1 })
      .limit(8); // Latest 8
    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ message: "Error fetching recommendations", error: err.message });
  }
});

export default router;
