const Product = require('../models/Product');
const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Images will be stored in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

exports.upload = multer({ storage });

// Add Product
exports.addProduct = async (req, res) => {
  const { name, price, description, category, stock } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: 'No image uploaded' });
  }

  // Input validation
  if (!name || !price || !description || !category || !stock) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if product already exists
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ message: 'Product with this name already exists' });
    }

    // Create and save the product
    const product = new Product({ name, price, description, image:req.file.filename, category, stock });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, image, category, stock } = req.body;

  // Input validation
  if (!name || !price || !description || !image || !category || !stock) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if product exists
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, description, image, category, stock },
      { new: true } // Return the updated document
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};