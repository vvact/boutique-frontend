import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { FaTrashAlt, FaTag } from 'react-icons/fa'; // ✅ Icons

function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🛒 Your Boutique Cart</h2>

      {cartItems.length === 0 ? (
        <div className="alert alert-info">Your cart is currently empty.</div>
      ) : (
        <>
          <div className="row">
            {cartItems.map((item) => (
              <div key={item.id} className="col-md-6 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body d-flex align-items-center">

                    {/* ✅ Rounded Product Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="rounded me-3"
                      style={{ width: '100px', height: '100px', objectFit: 'cover', border: '2px solid #dee2e6' }}
                    />

                    <div className="flex-grow-1">
                      <h5 className="card-title mb-2">{item.name}</h5>

                      {/* ✅ Price with icon */}
                      <p className="mb-1 text-muted">
                        <FaTag className="me-1 text-primary" />
                        <strong>KSh {item.price.toLocaleString()}</strong>
                      </p>

                      {/* ✅ Quantity Control with badge */}
                      <div className="d-flex align-items-center mb-2">
                        <button
                          className="btn btn-sm btn-outline-secondary me-2"
                          onClick={() => decreaseQuantity(item.id)}
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className="badge bg-dark rounded-pill px-3 py-2">
                          {item.quantity}
                        </span>
                        <button
                          className="btn btn-sm btn-outline-secondary ms-2"
                          onClick={() => increaseQuantity(item.id)}
                        >
                          +
                        </button>
                      </div>

                      <p className="mb-2 small">
                        Total: <strong>KSh {(item.price * item.quantity).toLocaleString()}</strong>
                      </p>

                      {/* ✅ Remove with icon */}
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <FaTrashAlt className="me-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Cart Total + Checkout */}
          <div className="border-top pt-4 mt-4 text-end">
            <h4>
              Cart Total:{' '}
              <span className="text-success">KSh {total.toLocaleString()}</span>
            </h4>
            <Link to="/checkout">
              <button className="btn btn-success mt-3 px-4 py-2 fw-bold">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
