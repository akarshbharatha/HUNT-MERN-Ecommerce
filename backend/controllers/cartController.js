import mongoose from "mongoose";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

/* ===========================================
   ADD TO CART
=========================================== */
export const addToCart = async (req, res) => {
  try {
    const { productId, size, color, quantity = 1 } = req.body;

    // Validation
    if (!productId || !size || !color) {
      return res.status(400).json({
        success: false,
        message: "Product, size and color are required.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Product ID.",
      });
    }

    const product = await Product.findById(productId);

    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    // Check if already exists
    let cartItem = await Cart.findOne({
      user: req.user.id,
      product: productId,
      size,
      color,
    });

    if (cartItem) {
      cartItem.quantity += Number(quantity);

      if (cartItem.quantity > product.stock) {
        return res.status(400).json({
          success: false,
          message: "Quantity exceeds available stock.",
        });
      }

      await cartItem.save();

      return res.status(200).json({
        success: true,
        message: "Cart updated successfully.",
        cartItem,
      });
    }

    if (quantity > product.stock) {
      return res.status(400).json({
        success: false,
        message: "Quantity exceeds available stock.",
      });
    }

    cartItem = await Cart.create({
      user: req.user.id,
      product: productId,
      size,
      color,
      quantity,
    });

    res.status(201).json({
      success: true,
      message: "Product added to cart.",
      cartItem,
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
   GET CART
=========================================== */
export const getCart = async (req, res) => {
  try {

    const cart = await Cart.find({
      user: req.user.id,
    })
      .populate(
        "product",
        "name price discountPrice images stock brand category"
      )
      .sort({ createdAt: -1 });

    let subtotal = 0;
    let totalItems = 0;

    cart.forEach((item) => {
      subtotal +=
        (item.product.discountPrice || item.product.price) *
        item.quantity;

      totalItems += item.quantity;
    });

    res.status(200).json({
      success: true,
      totalItems,
      subtotal,
      cart,
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
   UPDATE CART QUANTITY
=========================================== */
export const updateCartQuantity = async (req, res) => {
  try {

    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1.",
      });
    }

    const cartItem = await Cart.findOne({
      _id: id,
      user: req.user.id,
    }).populate("product");

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found.",
      });
    }

    if (quantity > cartItem.product.stock) {
      return res.status(400).json({
        success: false,
        message: "Quantity exceeds available stock.",
      });
    }

    cartItem.quantity = quantity;

    await cartItem.save();

    res.status(200).json({
      success: true,
      message: "Cart updated successfully.",
      cartItem,
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
   REMOVE CART ITEM
=========================================== */
export const removeCartItem = async (req, res) => {
  try {

    const cartItem = await Cart.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cart item removed.",
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
   CLEAR CART
=========================================== */
export const clearCart = async (req, res) => {
  try {

    await Cart.deleteMany({
      user: req.user.id,
    });

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully.",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};