const Recipe = require("../models/RecipeModel");
const Rating = require("../models/RatingModel");

const updateRating = (recipeId) => {
  let query = Rating.find({ recipe_id: recipeId });
  query.then((data) => {
    if (data.length > 0) {
      let ratings = data.map((val) => {
        return val["rating"];
      });
      let totalRatings = 0;
      for (var i = 0; i < ratings.length; i++) {
        totalRatings += ratings[i];
      }
      let averageRating = parseInt(Math.round(totalRatings / ratings.length));
      Recipe.updateOne(
        { _id: recipeId },
        { $set: { reciperating: averageRating } }
      )
        .then((result) => {})
        .catch((err) => {
          console.log(err);
        });
    } else {
      Recipe.updateOne({ _id: recipeId }, { $set: { reciperating: 0 } })
        .then((result) => {})
        .catch((err) => {
          console.log(err);
        });
    }
  });
};

module.exports = { updateRating };
