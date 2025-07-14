import { Link } from "react-router-dom";
import heroImage from "../assets/hero-men.jpg";

function Home() {
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
        }}
      >
        <h1 className="display-4 fw-bold">Elevate Your Look</h1>
        <p className="lead">Timeless men's fashion, crafted with power and presence.</p>
        <Link to="/products" className="btn btn-light mt-3">
          Shop Now
        </Link>
      </div>

      {/* ✅ One Statement Section */}
      <div className="bg-light text-center py-5">
        <h3 className="fw-semibold">Eastleigh Elegance. Muslim-Inspired Power.</h3>
        <p className="text-muted">Where luxury meets legacy.</p>
      </div>
    </div>
  );
}

export default Home;
