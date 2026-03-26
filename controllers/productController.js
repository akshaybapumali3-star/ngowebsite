const Product = require("../models/productModel");

// Add Product
exports.addProduct = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const { name, price, category, rating, ngoId } = req.body;
    const image = req.file ? `/api/uploads/${req.file.filename}` : null;

    if (!name || !price || !category || !ngoId) {
      console.log('Missing fields:', { name, price, category, ngoId });
      return res.status(400).json({ message: "Name, price, category, and ngoId are required" });
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      console.log('Invalid price:', price);
      return res.status(400).json({ message: "Price must be a valid number" });
    }

    const newProduct = new Product({
      name,
      image,
      price: parsedPrice,
      category,
      rating: rating || 0,
      ngoId
    });

    await newProduct.save();
    console.log('Product saved:', newProduct);

    res.status(201).json({
      message: "Product added successfully",
      product: newProduct
    });
  } catch (error) {
    console.log('Error saving product:', error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all products (optional, for marketplace)
exports.getProducts = async (req, res) => {
  try {
    const { category, ngoId } = req.query;
    let query = {};
    
    if (category) query.category = category;
    if (ngoId) query.ngoId = ngoId;
    
    let products = await Product.find(query);
    
    // Ensure image paths have the correct format
    products = products.map(product => ({
      ...product.toObject(),
      image: product.image && !product.image.startsWith('/api/uploads/') 
        ? `/api/uploads/${product.image}` 
        : product.image
    }));
    
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};