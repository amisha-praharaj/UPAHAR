import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import Product from "../models/product.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// ✅ Add Product
export const addProduct = async (req, res) => {
  try {
    const productData = JSON.parse(req.body.productData);
    const images = req.files;

    if (!images || images.length === 0) {
      return res.status(400).json({ success: false, message: "No images uploaded" });
    }

    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
        return result.secure_url;
      })
    );

    const newProduct = await Product.create({
      ...productData,
      images: imagesUrl,
    });

    res.status(200).json({ success: true, message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("❌ Error in addProduct:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all products
export const productList = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get single product by ID
export const productById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Change product inStock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { inStock },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: `Product stock updated to ${inStock ? "In Stock" : "Out of Stock"}`,
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};




