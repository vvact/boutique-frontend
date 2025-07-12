import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // ✅ Added
import { fetchCategories } from "../features/category/categorySlice";
import ProductCard from "../components/ProductCard";
import "../styles/Home.css";
import heroImage from "../assets/hero-men.jpg";

function Home() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.items);
  const featured = useSelector((state) =>
    state.products.items.filter((p) => p.is_featured).slice(0, 6)
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div>
      {/* ✅ Hero Banner */}
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

      {/* ✅ Categories Section */}
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

      {/* ✅ Featured Products */}
      <div className="container my-5" id="featured">
        <h2 className="mb-4 text-center">Featured Pieces</h2>
        <div className="row">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* ✅ Statement Section */}
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
