import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../services/api';
import { useCart } from '../context/CartContext';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart(); // ✅ access cart function

  useEffect(() => {
    getProduct(id)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error('Failed to fetch product:', err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const imageUrl = product.image.startsWith('http')
    ? product.image
    : `http://localhost:8000${product.image}`;

  return (
    <div className="row mt-4">
      <div className="col-md-6">
        <img
          src={imageUrl}
          alt={product.name}
          className="img-fluid rounded"
          style={{ objectFit: 'cover', maxHeight: '500px', width: '100%' }}
        />
      </div>
      <div className="col-md-6">
        <h2>{product.name}</h2>
        <p className="text-muted">KSh {product.price}</p>
        <p>{product.description}</p>
        
        <button
          className="btn btn-dark"
          onClick={() => addToCart(product)} // ✅ add product to cart
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
