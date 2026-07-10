import { Link } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";

function OrderSuccess() {
  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center text-center px-6">

      <FiCheckCircle
        className="text-green-600 mb-6"
        size={90}
      />

      <h1 className="text-4xl font-black">
        Order Placed Successfully!
      </h1>

      <p className="mt-4 text-neutral-500 max-w-md">
        Thank you for shopping with HUNT.
        Your order has been received and is being processed.
      </p>

      <Link
        to="/shop"
        className="mt-8 bg-black text-white px-8 py-3 rounded-lg"
      >
        Continue Shopping
      </Link>

    </div>
  );
}

export default OrderSuccess;