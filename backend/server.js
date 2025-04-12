import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import axios from "axios";
import connectDB from "./db.js";
import Recommendation from "./models/Recommendation.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import recommendationRoutes from "./routes/recommendations.js";

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/recommendations", recommendationRoutes);

app.get("/", (req, res) => {
  res.send("🎉 API is running");
});

// 🔥 AI Recommendation Route
app.post("/api/generate", async (req, res) => {
  try {
    const { relationship, ageGroup, gender, occasion, interests, priceRange, giftType } = req.body;

    if (!relationship || !occasion || !ageGroup || !gender || !interests || !priceRange || !giftType) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const prompt = `
I will give you inputs like relationship, gender, age group, occasion, interests, gift type, and price range. Based on that, give me 5 personalized gift suggestions in JSON format as:

{
  "recommendations": [
    {
      "gift_name": "...",
      "description": "...",
      "price_range": "...",
      "search_url": "...",
      "product_image": "...",
      "platform": "..."
    }
  ]
}
Only return valid JSON, no extra text.
Input:
Relationship: ${relationship}
Gender: ${gender}
Age Group: ${ageGroup}
Occasion: ${occasion}
Interests: ${interests}
Gift Type: ${giftType}
Price Range: ${priceRange}
`;

    const aiResponse = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemini-2.0-flash-exp:free",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const content = aiResponse.data?.choices?.[0]?.message?.content || "";
    const match = content.match(/\{[\s\S]*\}/);
    let recommendations = [];

    if (match) {
      try {
        recommendations = JSON.parse(match[0]).recommendations || [];

        const uniqueRecommendations = [];
        for (const rec of recommendations) {
          const existingRec = await Recommendation.findOne({ search_url: rec.search_url });
          if (!existingRec) {
            uniqueRecommendations.push(rec);
          }
        }

        if (uniqueRecommendations.length > 0) {
          await Recommendation.insertMany(uniqueRecommendations);
        }
      } catch (err) {
        console.error("JSON Parsing Error:", err);
      }
    }

    res.json({
      success: true,
      recommendations: recommendations.length ? recommendations : [],
    });
  } catch (error) {
    console.error("Server Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 📦 Fetch from DB
app.get("/api/recommendations", async (req, res) => {
  try {
    const recs = await Recommendation.find().sort({ createdAt: -1 }).limit(10);
    res.json({ success: true, recommendations: recs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
