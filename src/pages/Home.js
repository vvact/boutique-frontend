import { useEffect, useState } from "react";
import { getCategories, getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import '../styles/Home.css';
import heroImage from "../assets/hero-men.jpg";

function Home() {
  const [categories, setCategories] = useState([]);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data));
    getProducts().then((res) =>
      setFeatured(res.data.filter((p) => p.is_featured).slice(0, 6))
    );
  }, []);

  return (
    <div>
      {/* Hero Banner */}
      <div
        className="text-white text-center py-5"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "60vh",
          backgroundColor: "#111",
        }}
      >
        <h1 className="display-4 fw-bold">Elevate Your Look</h1>
        <p className="lead">
          Timeless men's fashion, crafted with power and presence.
        </p>
        <a href="#featured" className="btn btn-light mt-3">
          Shop Now
        </a>
      </div>

      {/* Categories Section */}
      <div className="container my-5">
        <h2 className="mb-4 text-center">Explore Categories</h2>
        <div className="row justify-content-center">
          {categories.map((cat) => (
            <div key={cat.id} className="col-6 col-md-3 mb-4">
              <div className="category-box text-center p-3 border rounded shadow-sm">
                <strong>{cat.name}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="container my-5" id="featured">
        <h2 className="mb-4 text-center">Featured Pieces</h2>
        <div className="row">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Statement Section */}
      <div className="bg-light text-center py-5">
        <h3 className="fw-semibold">
          Eastleigh Elegance. Muslim-Inspired Power.
        </h3>
        <p className="text-muted">Where luxury meets legacy.</p>
      </div>
    </div>
  );
}

export default Home;
