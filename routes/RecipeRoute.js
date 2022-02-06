const express = require("express");
const router = express.Router();
const Recipe = require("../models/RecipeModel");
const auth = require("../middleware/auth");
const { get } = require("mongoose");
const { check, validationResult } = require("express-validator");
const upload = require("../middleware/upload");

router.post(
  "/recipe/insert",
  auth.verifyAccount,
  upload.single("recipeimg"),
  [
    check("recipetitle", "Title is required for recipe").not().isEmpty(),
    check("recipedesc", " Recipe description is needed").not().isEmpty(),
    check("foodcategory", "Verify the category of food").not().isEmpty(),
    check("foodtype", "Meention the type of food").not().isEmpty(),
    check("preptime", "Tell the preparation time").not().isEmpty(),
  ],
  function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      if (req.file == undefined) {
        return res.status(200).json({ message: "Invalid file format" });
      } else {
        const recipetitle = req.body.recipetitle;
        const recipeimg = req.file.path;
        const recipedesc = req.body.recipedesc;
        const foodcategory = req.body.foodcategory;
        const foodtype = req.body.foodtype;
        const preptime = req.body.preptime;
        const recipedata = new Recipe({
          recipetitle: recipetitle,
          recipeimg: recipeimg,
          recipedesc: recipedesc,
          foodcategory: foodcategory,
          foodtype: foodtype,
          preptime: preptime,
          reciperating: 0,
          userId: req.user._id,
        });
        recipedata
          .save()
          .then(function (result) {
            res
              .status(201)
              .json({ message: "New Recipe Inserted !", success: "true" });
          })
          .catch(function (err) {
            console.log(err);
            res.status(500).json({ error: "err" });
          });
      }
    } else {
      res.status(400).json({ error: errors.array });
    }
  }
);

//update
//id - updated datafrom client
router.put(
  "/recipe/update",
  upload.single("recipeimg"),
  auth.verifyAccount,
  function (req, res) {
    if (req.file == undefined) {
      return res
        .status(202)
        .json({ success: false, message: "Inappropriate file format." });
    }
    const id = req.body.id;
    const recipetitle = req.body.recipetitle;
    const recipeimg = req.file.path;
    const recipedesc = req.body.recipedesc;
    const foodcategory = req.body.foodcategory;
    const foodtype = req.body.foodtype;
    const preptime = req.body.preptime;

    Recipe.updateOne(
      { _id: id },
      {
        recipetitle: recipetitle,
        recipeimg: recipeimg,
        recipedesc: recipedesc,
        foodcategory: foodcategory,
        foodtype: foodtype,
        preptime: preptime,
      }
    )
      .then(function (result) {
        res
          .status(200)
          .json({ message: "data updated successfully !", success: true });
      })
      .catch(function (e) {
        console.log(e);
        res.status(500).json({ error: e });
      });
  }
);

router.put('/update/recipe',auth.verifyAccount,(req,res)=>{
  let id = req.body.id;
  const recipetitle = req.body.recipetitle;
  const recipedesc = req.body.recipedesc;
  const foodcategory = req.body.foodcategory;
  const preptime = req.body.preptime;
  
  Recipe.findOneAndUpdate({"_id":id},{
    $set:{
      recipetitle: recipetitle,
      recipedesc: recipedesc,
      foodcategory: foodcategory,
      preptime: preptime
    }
  }).then((result)=>{
    Recipe.findOne({"_id":id})
    .then((data)=>{
      return res.status(200).json({"success":true,"message":"Recipe Updated","saved":data})
    })
  
  })
  .catch((err)=>{
    return res.status(404).json({"success":false,"message":err})
  })
})

//delete
router.delete("/recipe/delete/:id", auth.verifyAccount, function (req, res) {
  const id = req.params.id;
  Recipe.deleteOne({ _id: id })
    .then(function (result) {
      res
        .status(200)
        .json({ message: "data deleted successfully !", success: true });
    })
    .catch(function (e) {
      res.status(500).json({ error: e });
    });
});

//get all data
router.get("/recipe/allrec/:type", function (req, res) {
  let type = req.params.type;
  Recipe.find({ foodtype: type })
    .then(function (data) {
      // console.log(data);
      res.status(200).json({ success: true, recipes: data });
    })
    .catch(function (e) {
      res.status(500).json({ error: e });
    });
});

router.get("/recipe/allrec",auth.verifyAccount, function (req, res) {
  let type = req.params.type;
  Recipe.find({ userId:req.user._id })
    .then(function (data) {
      // console.log(data);
      res.status(200).json({ success: true, recipes: data });
    })
    .catch(function (e) {
      res.status(500).json({ error: e });
    });
});

//get single data
router.get("/recipe/selectedrec/:id", auth.verifyAccount, function (req, res) {
  const id = req.params.id;
  Recipe.findOne({ _id: id })
    .then(function (data) {
      res.status(200).json(data);
    })
    .catch(function (e) {
      res.status(500).json({ error: e });
    });
});


router.post(
  "/recipe/insertRecipe",
  auth.verifyAccount,
  
  [
    check("recipetitle", "Title is required for recipe").not().isEmpty(),
    check("recipedesc", " Recipe description is needed").not().isEmpty(),
    check("foodcategory", "Verify the category of food").not().isEmpty(),
    check("foodtype", "Meention the type of food").not().isEmpty(),
    check("preptime", "Tell the preparation time").not().isEmpty(),
  ],
  function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
       
        const recipetitle = req.body.recipetitle;
        const recipeimg = "no-img.jpg";
        const recipedesc = req.body.recipedesc;
        const foodcategory = req.body.foodcategory;
        const foodtype = req.body.foodtype;
        const preptime = req.body.preptime;
        const recipedata = new Recipe({
          recipetitle: recipetitle,
          recipeimg: recipeimg,
          recipedesc: recipedesc,
          foodcategory: foodcategory,
          foodtype: foodtype,
          preptime: preptime,
          reciperating: 0,
          userId: req.user._id,
        });
        recipedata
          .save()
          .then(function (result) {
            res
              .status(201)
              .json({ message: "New Recipe Inserted !", success: true,"saved":result });
          })
          .catch(function (err) {
            console.log(err);
            res.status(500).json({ error: "err" });
          });
      
    } else {
      res.status(400).json({ error: errors.array });
    }
  }
);


router.put("/uploadRecipeImg/:id",upload.single('recipeimg'),(req,res)=>{
  let id = req.params.id;
  let recipeImg = req.file.path;

  Recipe.updateOne({
    "_id":id
  },
  {
    $set:{
      "recipeimg": recipeImg
    }
  }
  
  
  ).then((result)=>{
    return res.status(200).json({"success":true,"message":"Added"})
  })
  .catch((err)=>{
    return res.status(404).json({"success":false,"message":err})
  })
})



module.exports = router;
