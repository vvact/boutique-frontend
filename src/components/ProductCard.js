import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  const imageUrl = product.main_image?.startsWith('http')
    ? product.main_image
    : `http://localhost:8000${product.main_image}`;

  return (
    <div className="col-md-4 mb-4">
      <Link
        to={`/products/${product.slug}`}
        className="text-decoration-none text-dark"
      >
        <div className="card h-100 shadow-sm border-0 hover-shadow">
          <img
            src={imageUrl}
            className="card-img-top"
            alt={product.name}
            style={{ objectFit: 'cover', height: '250px' }}
          />
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">KSh {product.base_price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
