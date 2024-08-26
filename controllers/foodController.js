const Food = require("../models/food");
const Category = require("../models/Category");

const createFood = async (req, res) => {
  try {
    const { name, price, image, categoryName, points } = req.body;

    let category = await Category.findOne({ name: categoryName });
    const food = new Food({
      name,
      price,
      image,
      category: category._id,
      points,
    });
    await food.save();
    res.status(201).json(food);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getFoods = async (req, res) => {
  try {
    const foods = await Food.find().populate("category");
    res.json(foods);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, image } = req.body;
    const food = await Food.findByIdAndUpdate(
      id,
      { name, price, image },
      { new: true }
    );
    if (!food) throw new Error("Food item was not found");
    res.json(food);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await Food.findByIdAndDelete(id);
    if (!food) throw new Error("Food item was not found");
    res.json({ message: "Food item deleted." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createFood, getFoods, updateFood, deleteFood };
