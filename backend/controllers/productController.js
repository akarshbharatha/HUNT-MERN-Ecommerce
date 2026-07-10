import mongoose from "mongoose";
import Product from "../models/Product.js";

/* ===========================================
   GET ALL PRODUCTS
=========================================== */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products.",
    });
  }
};

/* ===========================================
   GET SINGLE PRODUCT
=========================================== */
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Product ID.",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch product.",
    });
  }
};

/* ===========================================
   CREATE PRODUCT
=========================================== */
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      brand,
      category,
      price,
      discountPrice,
      stock,
      sizes,
      colors,
      featured,
      isActive,
    } = req.body;

    if (!name || !description || !category || !price || !stock) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const imageUrls =
      req.files?.map((file) => file.path) || [];

    const product = await Product.create({
      name,
      description,
      brand,
      category,
      price,
      discountPrice,
      stock,
      sizes: sizes
        ? Array.isArray(sizes)
          ? sizes
          : sizes.split(",")
        : [],
      colors: colors
        ? Array.isArray(colors)
          ? colors
          : colors.split(",")
        : [],
      images: imageUrls,
      featured,
      isActive,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully.",
      product,
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
   UPDATE PRODUCT
=========================================== */
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Product ID.",
      });
    }

    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update product.",
    });
  }
};

/* ===========================================
   DELETE PRODUCT
=========================================== */
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Product ID.",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete product.",
    });
  }
};