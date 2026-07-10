import Order from "../models/Order.js";

// Create Order
export const createOrder = async (req, res) => {
  try {
    const {
      products,
      shippingAddress,
      totalPrice,
      paymentMethod,
    } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No products found in order.",
      });
    }

    const order = await Order.create({
      user: req.user.id,
      products,
      shippingAddress,
      totalPrice,
      paymentMethod,
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully.",
      order,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Logged-in User Orders
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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// export const getOrderById = async (req, res) => {
//   try {
//     const order = await Order.findOne({
//       _id: req.params.id,
//       user: req.user.id,
//     }).populate("products.product");

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found.",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       order,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// // };
// export const getOrderById = async (req, res) => {
//   try {
//     console.log("Order ID:", req.params.id);
//     console.log("Logged-in User:", req.user.id);

//     const order = await Order.findById(req.params.id);

//     console.log("Order Found:", order);

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found in database.",
//       });
//     }

//     console.log("Order User:", order.user.toString());

//     if (order.user.toString() !== req.user.id) {
//       return res.status(403).json({
//         success: false,
//         message: "This order belongs to another user.",
//       });
//     }

//     await order.populate("products.product");

//     res.status(200).json({
//       success: true,
//       order,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};