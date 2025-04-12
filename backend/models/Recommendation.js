import mongoose from "mongoose";

const RecommendationSchema = new mongoose.Schema({
    gift_name: { type: String, required: true },
    description: { type: String, required: true },
    price_range: { type: String, required: true },
    buy_link: { type: String, required: true },
    image_url: { type: String, required: false },
    createdAt: { type: Date, default: Date.now }
});

const Recommendation = mongoose.model("Recommendation", RecommendationSchema);
export default Recommendation;
