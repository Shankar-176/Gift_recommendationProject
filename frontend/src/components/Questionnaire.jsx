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
    price_range: "₹4,999 - ₹9,999",
    platform: "Amazon",
    product_image: "https://m.media-amazon.com/images/I/61Bv5eG0bML._SX679_.jpg",
    search_url: "https://www.amazon.in/dp/B09SH994JW",
  },
  {
    gift_name: "Bluetooth Headphones",
    description: "Wireless, high-quality sound for music lovers.",
    price_range: "₹1,999 - ₹4,999",
    platform: "Flipkart",
    product_image: "https://rukminim2.flixcart.com/image/416/416/kz7bcsw0/headphone/j/p/f/-original-imagb6p72gztn3hz.jpeg",
    search_url: "https://www.flipkart.com/boat-rockerz-450-bluetooth-headset/p/itmd07c24c4e2b7c",
  },
  {
    gift_name: "Leather Wallet",
    description: "Premium leather wallet with a minimalist design.",
    price_range: "₹499 - ₹1,499",
    platform: "Amazon",
    product_image: "https://m.media-amazon.com/images/I/71tH0wz0USL._SX679_.jpg",
    search_url: "https://www.amazon.in/dp/B07ZVQK3MY",
  },
  {
    gift_name: "Instant Camera",
    description: "Capture memories instantly with this fun camera.",
    price_range: "₹4,000 - ₹7,000",
    platform: "Amazon",
    product_image: "https://m.media-amazon.com/images/I/71d7rfSl0TL._SL1500_.jpg",
    search_url: "https://www.amazon.in/dp/B08C5X75QD",
  },
  {
    gift_name: "Portable Speaker",
    description: "Compact Bluetooth speaker with great sound.",
    price_range: "₹2,000 - ₹4,000",
    platform: "Flipkart",
    product_image: "https://rukminim2.flixcart.com/image/416/416/xif0q/speaker/u/x/i/-original-imagg5gyzfswnrgd.jpeg",
    search_url: "https://www.flipkart.com/jbl-clip-4-portable-bluetooth-speaker/p/itmb115e9da5f0a0",
  },
  {
    gift_name: "Succulent Planter",
    description: "Decorate your home with a cute succulent planter.",
    price_range: "₹199 - ₹499",
    platform: "Amazon",
    product_image: "https://m.media-amazon.com/images/I/81IPYevwtHL._SL1500_.jpg",
    search_url: "https://www.amazon.in/dp/B08QV5N6FL",
  },
  {
    gift_name: "Fitness Tracker",
    description: "Track your workouts and health metrics with ease.",
    price_range: "₹1,999 - ₹3,499",
    platform: "Flipkart",
    product_image: "https://rukminim2.flixcart.com/image/416/416/l4zxn680/smart-band-tag/g/f/u/-original-imagfrfvkz2ddgwh.jpeg",
    search_url: "https://www.flipkart.com/mi-smart-band-6/p/itm63e75da20934f",
  },
  {
    gift_name: "Aromatherapy Diffuser",
    description: "Relax with a soothing essential oil diffuser.",
    price_range: "₹999 - ₹1,999",
    platform: "Amazon",
    product_image: "https://m.media-amazon.com/images/I/71-4hzDZ2BL._SL1500_.jpg",
    search_url: "https://www.amazon.in/dp/B08W51X6C1",
  },
  {
    gift_name: "Yoga Mat",
    description: "A non-slip yoga mat for your workouts and stretches.",
    price_range: "₹699 - ₹1,299",
    platform: "Flipkart",
    product_image: "https://rukminim2.flixcart.com/image/416/416/kp8ntzk0/exercise-fitness-mat/6/b/q/6-mm-yoga-mat-with-free-carry-bag-back-support-mat-for-men-and-original-imag3f6z94guubfv.jpeg",
    search_url: "https://www.flipkart.com/decathlon-essentials-yoga-mat-8mm/p/itm2ff5e94b4e400",
  },
  {
    gift_name: "Gourmet Chocolate Box",
    description: "A luxurious selection of gourmet chocolates.",
    price_range: "₹799 - ₹1,499",
    platform: "Amazon",
    product_image: "https://m.media-amazon.com/images/I/61PKsN2Yh-L._SL1500_.jpg",
    search_url: "https://www.amazon.in/dp/B08C2YTBP8",
  },
];

const Questionnaire = ({ onSubmit = (data) => console.log("Received:", data) }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onFormSubmit = async (data) => {
    setLoading(true);

    const requestData = {
      relationship: data.relationship?.trim(),
      ageGroup: data.ageGroup?.trim(),
      gender: data.gender?.trim(),
      occasion: data.occasion?.trim(),
      interests: data.interests?.trim(),
      priceRange: data.priceRange?.trim(),
      giftType: data.giftType?.trim(),
    };

    try {
      const response = await axios.post(
        "https://gift-recommendation-ulo1.onrender.com/api/generate",
        requestData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success && response.data.recommendations?.length > 0) {
        onSubmit(response.data.recommendations);
        navigate("/recommendations", {
          state: { recommendations: response.data.recommendations },
        });
      } else {
        onSubmit(staticRecommendations);
        navigate("/recommendations", {
          state: { recommendations: staticRecommendations },
        });
      }
    } catch (error) {
      console.error("❌ API Error:", error.message || error.response?.data);
      onSubmit(staticRecommendations);
      navigate("/recommendations", {
        state: { recommendations: staticRecommendations },
      });
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

        <label>Relationship:</label>
        <input type="text" {...register("relationship", { required: "Relationship is required" })} placeholder="Friend, Family, Partner, etc." />
        {errors.relationship && <p className="error-message">{errors.relationship.message}</p>}

        <label>Age Group:</label>
        <input type="text" {...register("ageGroup", { required: "Age group is required" })} placeholder="0-5, 6-12, 13-19, etc." />
        {errors.ageGroup && <p className="error-message">{errors.ageGroup.message}</p>}

        <label>Gender:</label>
        <input type="text" {...register("gender", { required: "Gender is required" })} placeholder="Male, Female, Non-binary, etc." />
        {errors.gender && <p className="error-message">{errors.gender.message}</p>}

        <label>Occasion:</label>
        <input type="text" {...register("occasion", { required: "Occasion is required" })} placeholder="Birthday, Anniversary, etc." />
        {errors.occasion && <p className="error-message">{errors.occasion.message}</p>}

        <label>Interests:</label>
        <input type="text" {...register("interests", { required: "Interests are required" })} placeholder="Technology, Music, Sports, etc." />
        {errors.interests && <p className="error-message">{errors.interests.message}</p>}

        <label>Price Range:</label>
        <input type="text" {...register("priceRange", { required: "Price range is required" })} placeholder="Under 500, 600-1000, 1100-5000 etc." />
        {errors.priceRange && <p className="error-message">{errors.priceRange.message}</p>}

        <label>Gift Type:</label>
        <input type="text" {...register("giftType", { required: "Gift type is required" })} placeholder="Personalized Gift, Luxury Item, etc." />
        {errors.giftType && <p className="error-message">{errors.giftType.message}</p>}

        <div className="submit-button">
          <button type="submit" disabled={loading}>
            {loading ? "Fetching Recommendations..." : "Get Recommendation"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default Questionnaire;
