import React, { useState, useEffect } from "react";
import "../styles/recommendations.css";

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Static recommendations data
    const defaultRecommendations = [
      { 
        gift_name: "Smartwatch", 
        description: "A stylish and functional smartwatch.", 
        price_range: " ₹300 - ₹400", 
        platform: "Tech Store", 
        product_image: "https://example.com/smartwatch.jpg", 
        search_url: "https://www.amazon.com/s?k=Smartwatch&crid=335RIRJSU1FE1&sprefix=smartwatch%2Caps%2C588&ref=nb_sb_noss_1"
      },
      { 
        gift_name: "Bluetooth Headphones", 
        description: "Wireless, high-quality sound for music lovers.", 
        price_range: " ₹500 - ₹007", 
        platform: "Audio Store", 
        product_image: "https://example.com/headphones.jpg", 
        search_url: "https://www.amazon.com/s?k=Bluetooth+Headphones&crid=XXHBBXI0EMRY&sprefix=bluetooth+headphones%2Caps%2C569&ref=nb_sb_noss_1"
      },
      { 
        gift_name: "Leather Wallet", 
        description: "Premium leather wallet with a minimalist design.", 
        price_range: " ₹200 - ₹300", 
        platform: "Fashion Store", 
        product_image: "https://example.com/wallet.jpg", 
        search_url: "https://www.amazon.com/s?k=Leather+Wallet&crid=YUDYDJXUDVG4&sprefix=leather+wallet%2Caps%2C873&ref=nb_sb_noss_1"
      },
      
      { 
        gift_name: "Portable Speaker", 
        description: "Compact Bluetooth speaker with great sound.", 
        price_range: " ₹1000 - ₹2000", 
        platform: "Audio Store", 
        product_image: "https://example.com/speaker.jpg", 
        search_url: "https://www.amazon.com/s?k=Portable+Speaker&crid=4FVK1M238TLO&sprefix=portable+speaker%2Caps%2C740&ref=nb_sb_noss_1"
      },
      {
        gift_name: "Levi's Men's 501 Original Fit Jeans",
        description: "Classic straight-leg jeans made from durable denim, a wardrobe staple for men.",
        price_range: "₹4,500 - ₹6,000",
        search_url: "https://www.amazon.com/s?k=Levi%27s+Men%27s+501+Original+Fit+Jeans&crid=YAZ2AO49E26Y&sprefix=levi%27s+men%27s+501+original+fit+jeans%2Caps%2C582&ref=nb_sb_noss_1",
        product_image: "https://m.media-amazon.com/images/I/81h9hL5h4yL._AC_SL1500_.jpg",
       
      },
      {
        gift_name: "Adidas Men's Ultraboost DNA Running Shoe",
        description: "Comfortable and stylish running shoes with responsive cushioning, suitable for everyday wear.",
        price_range: "₹12,000 - ₹15,000",
        search_url: "https://www.amazon.com/s?k=%22gift_name%22%3A+%22Adidas+Men%27s+Ultraboost+DNA+Running+Shoe%22%2C&crid=1NBJVFU56MG9F&sprefix=gift_name+adidas+men%27s+ultraboost+dna+running+shoe+%2C%2Caps%2C566&ref=nb_sb_noss",
        product_image: "https://m.media-amazon.com/images/I/81b0J1sD8cL._AC_SL1500_.jpg",
        
      },
      {
        gift_name: "Titan Neo Analog Black Dial Men's Watch",
        description: "Classic analog watch with a black dial, suitable for formal and casual occasions.",
        price_range: "₹2,500 - ₹4,000",
        search_url: "https://www.amazon.com/s?k=Titan+Neo+Analog+Black+Dial+Men%27s+Watch&crid=1EE6GHMFJI7KI&sprefix=titan+neo+analog+black+dial+men%27s+watch%2Caps%2C612&ref=nb_sb_noss",
        product_image: "https://m.media-amazon.com/images/I/8144XvHn9yL._AC_SL1500_.jpg",
        platform: "Amazon India"
      },
       {
        gift_name: "Allen Solly Men's Regular Fit Shirt",
        description: "Formal or casual regular fit shirt, made from comfortable cotton.",
        price_range: "₹1,500 - ₹2,500",
        search_url: "https://www.amazon.com/s?k=Allen+Solly+Men%27s+Regular+Fit+Shirt&crid=3EZYDO4AIT3Z0&sprefix=allen+solly+men%27s+regular+fit+shirt%2Caps%2C505&ref=nb_sb_noss",
        product_image: "https://m.media-amazon.com/images/I/718h2h5LgZL._AC_UL480_FMwebp_QL65_.jpg",
  
      },
      
    ];

    setRecommendations(defaultRecommendations);
  }, []);

  return (
    <div className="recommendations-container">
      <h2>🎁 Recommended Gifts</h2>
      {error && <p className="error-msg">{error}</p>}

      {recommendations.length === 0 ? (
        <p className="loading-message">Loading recommendations...</p>
      ) : (
        <div className="recommendation-grid">
          {recommendations.map((item, index) => (
            <div key={index} className="recommendation-card">
              <div className="gift-image-container">
                {item.product_image && (
                  <img
                    src={item.product_image}
                    alt={item.gift_name}
                    className="gift-image"
                  />
                )}
              </div>
              <div className="gift-details">
                <h3>{item.gift_name || "Mystery Gift"}</h3>
                <p className="description">
                  {item.description || "An exciting gift choice!"}
                </p>
                <div className="gift-meta">
                  <span className="price">{item.price_range}</span>
                  <span className="platform">{item.platform || "Online Store"}</span>
                </div>
                <a
                  href={item.search_url}
                  className="view-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Product
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommendations;
