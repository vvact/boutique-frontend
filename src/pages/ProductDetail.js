import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // ✅ You missed this
import { fetchProductDetail } from '../features/product/productSlice';
import { useCart } from '../context/CartContext';

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.productDetail);
  const { addToCart } = useCart();

  useEffect(() => {
    dispatch(fetchProductDetail(id));
  }, [dispatch, id]);

  if (!product) return <p>Loading...</p>;

  const imageUrl = product.image?.startsWith('http')
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
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
// src/pages/ProductDetail.js
// ✅ You missed the import statement for useDispatch and useSelector