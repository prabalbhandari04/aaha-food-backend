const express = require("express");
const router = express.Router();
const Rating = require("../models/RatingModel");
const auth = require("../middleware/auth");
const { updateRating } = require("../utils/userUtils");

router.post("/rate/recipe", auth.verifyAccount, (req, res) => {
  let rating = parseInt(req.body["rating"]);
  let recipe_id = req.body["recipeId"];

  Rating.findOne({ user_id: req.user._id, recipe_id: recipe_id }).then(
    (data) => {
      if (data != null) {
        Rating.updateOne(
          { user_id: req.user._id, recipe_id: recipe_id },
          { $set: { rating: parseInt(rating) } }
        )
          .then((result) => {
            updateRating(recipe_id);
            return res.status(200).json({ success: true, message: "Rated!!" });
          })
          .catch((err) => {
            console.log(err);
            return res.status(404).json({ success: false, message: err });
          });
      } else {
        const rate = new Rating({
          user_id: req.user.id,
          recipe_id: recipe_id,
          rating: parseInt(rating),
        });
        rate
          .save()
          .then((result) => {
            updateRating(recipe_id);
            return res.status(200).json({ success: true, message: "Rated!!" });
          })
          .catch((err) => {
            console.log(err);
            return res.status(404).json({ success: false, message: err });
          });
      }
    }
  );
});

router.get("/myRatings",  (req, res) => {
  let query = Rating.find({ user_id: req.user._id });
  query
    .then((data) => {
      if (data.length > 0) {
        return res
          .status(200)
          .json({ message: "Retrieved", data: data, success: true });
      } else {
        return res
          .status(202)
          .json({ message: "Not Retrieved", data: data, success: false });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({ message: err, success: false });
    });
});

module.exports = router;
