import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  const imageUrl = product.image.startsWith('http')
    ? product.image
    : `http://localhost:8000${product.image}`;

  return (
    <div className="col-md-4 mb-4">
      <Link
        to={`/products/${product.id}`}
        className="text-decoration-none text-dark"
      >
        <div className="card h-100">
          <img
            src={imageUrl}
            className="card-img-top"
            alt={product.name}
            style={{ objectFit: 'cover', height: '250px' }}
          />
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">KSh {product.price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
