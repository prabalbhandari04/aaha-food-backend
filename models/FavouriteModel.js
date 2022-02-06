const mongoose = require("mongoose");
const { ObjectId } = require("bson");
const User = require("../models/userModel");
const Recipe = require("../models/RecipeModel");
const Favourite = mongoose.model("Favourite", {
  userId: {
    type: ObjectId,
    required: true,
    ref: User,
  },

  recipeId: { type: ObjectId, required: true, ref: Recipe },
  date: { type: Date, required: true },
});
module.exports = Favourite;
