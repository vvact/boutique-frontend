import { useCart } from '../context/CartContext';

function Cart() {
  const { cartItems, removeFromCart } = useCart();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cartItems.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{item.name}</h5>
                  <p>Price: KSh {item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <h4>Total: KSh {total.toLocaleString()}</h4>
          <button className="btn btn-success mt-2">Proceed to Checkout</button>
        </>
      )}
    </div>
  );
}

export default Cart;
