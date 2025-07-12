// src/pages/ProductList.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // ✅ You forgot this
import { fetchProducts } from '../features/product/productSlice';
import ProductCard from '../components/ProductCard';

function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]); // ✅ This was incorrectly closed earlier

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="mb-4">Our Products</h2>
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
// ✅ Ensure you have the necessary imports for useDispatch and useSelector