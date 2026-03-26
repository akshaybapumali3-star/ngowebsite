const Category = require("../models/categoryModel");

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    // If no categories in DB, return default ones
    if (categories.length === 0) {
      const defaultCategories = [
        'Handmade Bags',
        'Festival seasonal products',
        'Gifting Hampers',
        'Home Decor',
        'clothing',
        'Malanand Made Bags'
      ];
      // Optionally, insert them into DB
      // But for now, just return
      return res.json(defaultCategories.map(name => ({ name })));
    }
    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Add category (optional)
exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }
    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json({ message: "Category added", category: newCategory });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};