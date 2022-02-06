const mongoose = require("mongoose");
const { ObjectId } = require("bson");
const User = require("./userModel");

const Recipe = mongoose.model("Recipe", {
  recipetitle: { type: String, required: true },
  recipeimg: { type: String, required: true },
  recipedesc: { type: String, required: true },
  foodcategory: { type: String, " required": true },
  foodtype: {
    type: String,
    required: true,
    enum: ["Breakfast", "Lunch", "Dinner", "Bakery", "__"],
  },
  reciperating: { type: Number },
  preptime: { type: String, required: true },
  userId: { type: ObjectId, ref: User },
});

module.exports = Recipe;
