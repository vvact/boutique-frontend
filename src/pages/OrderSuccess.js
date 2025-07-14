// src/pages/OrderSuccess.js
import { useSelector } from 'react-redux';

function OrderSuccess() {
  const { orderDetails } = useSelector((state) => state.orders);

  return (
    <div className="container mt-5 text-center">
      <h2 className="text-success">🎉 Order Placed Successfully!</h2>
      <p>Thank you for shopping with us. We'll contact you shortly regarding delivery.</p>

      {orderDetails && (
        <p>Your order number is <strong>#{orderDetails.id}</strong></p>
      )}
    </div>
  );
}

export default OrderSuccess;
