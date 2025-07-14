// src/pages/Checkout.js
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { placeOrder } from '../features/orders/orderSlice';
import { clearCart } from '../features/cart/cartSlice';
import API from '../services/api';

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const { loading, error } = useSelector((state) => state.orders);

  const [form, setForm] = useState({
    email: '',
    phone_number: '',
    specific_address: '',
    neighborhood: '',
    notes: '',
  });

  const [neighborhoods, setNeighborhoods] = useState([]);
  const [loadingNeighborhoods, setLoadingNeighborhoods] = useState(true);

  // Fetch neighborhoods
  useEffect(() => {
    API.get('orders/neighborhoods/')
      .then((res) => setNeighborhoods(res.data.results))
      .catch((err) => console.error('Neighborhoods error:', err))
      .finally(() => setLoadingNeighborhoods(false));
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, phone_number, specific_address, neighborhood } = form;
    if (!email || !phone_number || !specific_address || !neighborhood) {
      alert('Please fill in all required fields.');
      return;
    }

    const orderPayload = {
      ...form,
      total: total,
      items: cartItems.map((item) => ({
        product: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      const result = await dispatch(placeOrder(orderPayload));

      if (placeOrder.fulfilled.match(result)) {
        dispatch(clearCart());
        navigate('/order-success');
      } else {
        alert('Order failed. Please try again.');
      }
    } catch (err) {
      console.error('Order dispatch failed:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Checkout</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email (for guest checkout)</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            name="phone_number"
            className="form-control"
            value={form.phone_number}
            onChange={handleChange}
            placeholder="e.g. 0700000000"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Specific Address</label>
          <input
            type="text"
            name="specific_address"
            className="form-control"
            value={form.specific_address}
            onChange={handleChange}
            placeholder="e.g. Plot 34, Juja Road"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Neighborhood</label>
          {loadingNeighborhoods ? (
            <div className="form-text">Loading neighborhoods...</div>
          ) : (
            <select
              name="neighborhood"
              className="form-select"
              value={form.neighborhood}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Neighborhood --</option>
              {neighborhoods.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Notes (optional)</label>
          <textarea
            name="notes"
            className="form-control"
            value={form.notes}
            onChange={handleChange}
            rows="3"
            placeholder="e.g. Please call before delivery..."
          />
        </div>

        <div className="mb-4">
          <h5>Order Summary</h5>
          <ul className="list-group">
            {cartItems.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between">
                {item.name} x {item.quantity}
                <span>KSh {(item.price * item.quantity).toLocaleString()}</span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between fw-bold">
              Total
              <span>KSh {total.toLocaleString()}</span>
            </li>
          </ul>
        </div>

        {error && <div className="alert alert-danger">Error: {error}</div>}

        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
}

export default Checkout;
