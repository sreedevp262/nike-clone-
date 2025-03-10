const express = require('express');
const router = express.Router();
const { addProduct, updateProduct, deleteProduct,upload } = require('../controllers/admin'); // Import deleteProduct
const authMiddleware = require('../middleware/auth');
const authorizeAdmin = require('../middleware/authorizeAdmin');


// Add Product (Admin Only)
router.post('/products', authMiddleware, authorizeAdmin,upload.single('image'), addProduct);


// Update Product (Admin Only)
router.put('/products/:id', authMiddleware, authorizeAdmin, updateProduct);

// Delete Product (Admin Only)
router.delete('/products/:id', authMiddleware, authorizeAdmin, deleteProduct); // Use deleteProduct

module.exports = router;