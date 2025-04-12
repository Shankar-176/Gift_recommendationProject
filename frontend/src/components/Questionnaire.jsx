import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Questionnaire.css";

// Static fallback recommendations with Amazon/Flipkart links
const staticRecommendations = [
  { 
    gift_name: "Smartwatch", 
    description: "A stylish and functional smartwatch.", 
    price_range: "$150 - $300", 
    platform: "Amazon", 
    product_image: "https://example.com/smartwatch.jpg", 
    search_url: "https://www.amazon.com/dp/B08Q7L7W5J" // Real product link (Amazon)
  },
  { 
    gift_name: "Bluetooth Headphones", 
    description: "Wireless, high-quality sound for music lovers.", 
    price_range: "$50 - $150", 
    platform: "Flipkart", 
    product_image: "https://example.com/headphones.jpg", 
    search_url: "https://www.flipkart.com/sennheiser-hd-450bt-wireless-bluetooth-headset/p/itmfc8aefbb559ae" // Real product link (Flipkart)
  },
  { 
    gift_name: "Leather Wallet", 
    description: "Premium leather wallet with a minimalist design.", 
    price_range: "$30 - $80", 
    platform: "Amazon", 
    product_image: "https://example.com/wallet.jpg", 
    search_url: "https://www.amazon.com/dp/B07ZVQK3MY" // Real product link (Amazon)
  },
  { 
    gift_name: "Instant Camera", 
    description: "Capture memories instantly with this fun camera.", 
    price_range: "$60 - $150", 
    platform: "Amazon", 
    product_image: "https://example.com/camera.jpg", 
    search_url: "https://www.amazon.com/dp/B08C5X75QD" // Real product link (Amazon)
  },
  { 
    gift_name: "Portable Speaker", 
    description: "Compact Bluetooth speaker with great sound.", 
    price_range: "$40 - $120", 
    platform: "Flipkart", 
    product_image: "https://example.com/speaker.jpg", 
    search_url: "https://www.flipkart.com/jbl-clip-4-portable-bluetooth-speaker/p/itmb115e9da5f0a0" // Real product link (Flipkart)
  },
  { 
    gift_name: "Succulent Planter", 
    description: "Decorate your home with a cute succulent planter.", 
    price_range: "$10 - $30", 
    platform: "Amazon", 
    product_image: "https://example.com/planter.jpg", 
    search_url: "https://www.amazon.com/dp/B08QV5N6FL" // Real product link (Amazon)
  },
  { 
    gift_name: "Fitness Tracker", 
    description: "Track your workouts and health metrics with ease.", 
    price_range: "$50 - $100", 
    platform: "Flipkart", 
    product_image: "https://example.com/fitness-tracker.jpg", 
    search_url: "https://www.flipkart.com/mi-smart-band-6/p/itm63e75da20934f" // Real product link (Flipkart)
  },
  { 
    gift_name: "Aromatherapy Diffuser", 
    description: "Relax with a soothing essential oil diffuser.", 
    price_range: "$20 - $60", 
    platform: "Amazon", 
    product_image: "https://example.com/diffuser.jpg", 
    search_url: "https://www.amazon.com/dp/B08W51X6C1" // Real product link (Amazon)
  },
  { 
    gift_name: "Yoga Mat", 
    description: "A non-slip yoga mat for your workouts and stretches.", 
    price_range: "$20 - $50", 
    platform: "Flipkart", 
    product_image: "https://example.com/yoga-mat.jpg", 
    search_url: "https://www.flipkart.com/decathlon-essentials-yoga-mat-8mm/p/itm2ff5e94b4e400" // Real product link (Flipkart)
  },
  { 
    gift_name: "Gourmet Chocolate Box", 
    description: "A luxurious selection of gourmet chocolates.", 
    price_range: "$30 - $70", 
    platform: "Amazon", 
    product_image: "https://example.com/chocolate-box.jpg", 
    search_url: "https://www.amazon.com/dp/B08C2YTBP8" // Real product link (Amazon)
  },
];

const Questionnaire = ({ onSubmit = (data) => console.log("Received:", data) }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onFormSubmit = async (data) => {
    setLoading(true);
    setError("");

    const requestData = {
      relationship: data.relationship?.trim(),
      ageGroup: data.ageGroup?.trim(),
      gender: data.gender?.trim(),
      occasion: data.occasion?.trim(),
      interests: data.interests?.trim(),
      priceRange: data.priceRange?.trim(),
      giftType: data.giftType?.trim(),
    };

    console.log("📤 Sending Request:", requestData);

    try {
      const response = await axios.post("http://localhost:5000/api/generate", requestData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("✅ API Response:", response.data);

      if (response.data.success && response.data.recommendations?.length > 0) {
        onSubmit(response.data.recommendations);
        navigate("/recommendations", { state: { recommendations: response.data.recommendations } });
      } else {
        // If no recommendations are found, set static recommendations
        onSubmit(staticRecommendations);
        navigate("/recommendations", { state: { recommendations: staticRecommendations } });
      }
    } catch (error) {
      console.error("❌ API Error:", error.response?.data || error.message);
      setError("❌ API error. Check your connection.");
    }

    setLoading(false);
  };

  return (
    <motion.div
      className="questionnaire"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <h2>🎁 Gift Recommendation Form</h2>

        {/* Relationship */}
        <label>Relationship:</label>
        <input
          type="text"
          {...register("relationship", { required: "Relationship is required" })}
          placeholder="Friend, Family, Partner, etc."
        />
        {errors.relationship && <p className="error-message">{errors.relationship.message}</p>}

        {/* Age Group */}
        <label>Age Group:</label>
        <input
          type="text"
          {...register("ageGroup", { required: "Age group is required" })}
          placeholder="0-5, 6-12, 13-19, etc."
        />
        {errors.ageGroup && <p className="error-message">{errors.ageGroup.message}</p>}

        {/* Gender */}
        <label>Gender:</label>
        <input
          type="text"
          {...register("gender", { required: "Gender is required" })}
          placeholder="Male, Female, Non-binary, etc."
        />
        {errors.gender && <p className="error-message">{errors.gender.message}</p>}

        {/* Occasion */}
        <label>Occasion:</label>
        <input
          type="text"
          {...register("occasion", { required: "Occasion is required" })}
          placeholder="Birthday, Anniversary, etc."
        />
        {errors.occasion && <p className="error-message">{errors.occasion.message}</p>}

        {/* Interests */}
        <label>Interests:</label>
        <input
          type="text"
          {...register("interests", { required: "Interests are required" })}
          placeholder="Technology, Music, Sports, etc."
        />
        {errors.interests && <p className="error-message">{errors.interests.message}</p>}

        {/* Price Range */}
        <label>Price Range:</label>
        <input
          type="text"
          {...register("priceRange", { required: "Price range is required" })}
          placeholder="Under 500, 600-1000, 1100-5000 etc."
        />
        {errors.priceRange && <p className="error-message">{errors.priceRange.message}</p>}

        {/* Gift Type */}
        <label>Gift Type:</label>
        <input
          type="text"
          {...register("giftType", { required: "Gift type is required" })}
          placeholder="Personalized Gift, Luxury Item, etc."
        />
        {errors.giftType && <p className="error-message">{errors.giftType.message}</p>}

        {/* Submit Button */}
        <div className="submit-button">
          <button type="submit" disabled={loading}>
            {loading ? "Fetching Recommendations..." : "Get Recommendation"}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
    </motion.div>
  );
};

export default Questionnaire;
