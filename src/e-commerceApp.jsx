import React, { useState } from "react";
import "./e-commerce.css"; // Links the CSS stylesheet to this component

const MOCK_PRODUCTS = [
  { id: 1, name: "Wireless Headphones", price: 99.99, category: "Electronics", image: "🎧" },
  { id: 2, name: "Smart Watch", price: 199.99, category: "Electronics", image: "⌚" },
  { id: 3, name: "Running Shoes", price: 79.99, category: "Clothing", image: "👟" },
  { id: 4, name: "Leather Jacket", price: 149.99, category: "Clothing", image: "🧥" },
  { id: 5, name: "Coffee Maker", price: 49.99, category: "Home", image: "☕" },
  { id: 6, name: "Desk Lamp", price: 29.99, category: "Home", image: "💡" },
];

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);

  function handleAddToCart(productId) {
    setCart([...cart, productId]);
    console.log("Item added! Current cart IDs:", [...cart, productId]);
  }

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="catalog-container">
      
      {/* Header Panel */}
      <div className="catalog-header">
        <h1>⚡ Product Catalog</h1>
        <div className="cart-badge">
          🛒 Cart ({cart.length})
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="controls-panel">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Home">Home</option>
        </select>
      </div>

      {/* Grid Layout Display */}
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-details">
                <div className="product-emoji">{product.image}</div>
                <h3 className="product-title">{product.name}</h3>
                <p className="product-category-tag">{product.category}</p>
                <strong className="product-price">${product.price}</strong>
              </div>
              
              <button 
                onClick={() => handleAddToCart(product.id)}
                className="add-to-cart-btn"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="no-results-msg">No products found matching your criteria.</p>
        )}
      </div>
    </div>
  );
}

export default App;
