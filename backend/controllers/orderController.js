import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Address from "../models/Address.js";

/* ===========================================
   CREATE ORDER
=========================================== */
export const createOrder = async (req, res) => {
  try {
    const { addressId, paymentMethod } = req.body;

    // Get user's cart
    const cartItems = await Cart.find({
      user: req.user.id,
    }).populate("product");

    if (cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty.",
      });
    }

    // Get shipping address
    const address = await Address.findOne({
      _id: addressId,
      user: req.user.id,
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found.",
      });
    }

    let totalPrice = 0;
    const orderProducts = [];

    // Validate stock & calculate total
    for (const item of cartItems) {
      const product = item.product;

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "One of the products no longer exists.",
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `${product.name} is out of stock.`,
        });
      }

      const price =
        product.discountPrice > 0
          ? product.discountPrice
          : product.price;

      totalPrice += price * item.quantity;

      orderProducts.push({
        product: product._id,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
      });
    }

    // Create order
    const order = await Order.create({
      user: req.user.id,

      products: orderProducts,

      shippingAddress: {
        fullName: address.fullName,
        phone: address.phone,
        email: "", // We'll improve this later
        address: address.address,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        country: address.country,
      },

      totalPrice,

      paymentMethod,
    });

    // Reduce stock
    for (const item of cartItems) {
      const product = await Product.findById(item.product._id);

      product.stock -= item.quantity;

      await product.save();
    }

    // Clear cart
    await Cart.deleteMany({
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully.",
      order,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================================
   GET MY ORDERS
=========================================== */
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    })
      .populate("products.product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================================
   GET ORDER BY ID
=========================================== */
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user.id,
    }).populate("products.product");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
/* ===========================================
   CANCEL ORDER
=========================================== */
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    if (
      order.orderStatus === "Shipped" ||
      order.orderStatus === "Out for Delivery" ||
      order.orderStatus === "Delivered"
    ) {
      return res.status(400).json({
        success: false,
        message: "This order cannot be cancelled.",
      });
    }

    if (order.orderStatus === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Order is already cancelled.",
      });
    }

    order.orderStatus = "Cancelled";
    order.cancelledAt = new Date();

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully.",
      order,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
/* ===========================================
   GET ALL ORDERS (ADMIN)
=========================================== */
export const getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      totalOrders: orders.length,
      orders,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* ===========================================
   UPDATE ORDER STATUS (ADMIN)
=========================================== */
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;
console.log(req.body);
console.log(orderStatus);
    const allowedStatus = [
      "Processing",
      "Confirmed",
      "Packed",
      "Shipped",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatus.includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status.",
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    order.orderStatus = orderStatus;

    if (orderStatus === "Delivered") {
      order.deliveredAt = new Date();
    }

    if (orderStatus === "Cancelled") {
      order.cancelledAt = new Date();
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully.",
      order,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};