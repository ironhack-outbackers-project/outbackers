const router = require("express").Router();

const Recom = require("../models/Recom.model");
//const User = require("../models/User.model");

// Require necessary (isLoggedOut and isLoggedIn) middleware in order to control access to specific routes
const isLoggedIn = require("../middleware/isLoggedIn");
const isCreator = require("../middleware/isCreator");

// Require Country List
const countryArr = require("../data/countries.js"); // array of country list

// READ: display list of recommendations
router.get("/recommendations", (req, res, next) => {
  Recom.find()
    .then((recommendationsFromDB) => {
      res.render("recommendations/recom-list", {
        recommendations: recommendationsFromDB,
      });
    })
    .catch((error) => {
      console.log("Error displaying recommendations", error);
      next(error);
    });
});

// CREATE: display form
router.get("/recommendations/create", isLoggedIn, (req, res, next) => {
  Recom.find()
    .then((recommendationsArr) => {
      res.render("recommendations/recom-create", {
        recommendationsArr,
        countryArr,
      });
    })
    .catch((error) => {
      console.log("Error displaying form", error);
      next();
    });
});

//CREATE: process form
router.post("/recommendations/create", isLoggedIn, (req, res, next) => {
  const {
    title,
    description,
    advice,
    country,
    city,
    image,
  } = req.body;

  const creator = req.session.currentUser._id;

  // check if title, description and creator are provided
  if (title === "" || description === "" || creator === "") {
    res.status(400).render("recommendations/recom-create", {
      errorMessage:
        "All fields are mandatory. Please provide a title, description and creator's name.",
    });
    return;
  }

  Recom.create({
    title,
    description,
    advice,
    country,
    city,
    image,
    creator,
  })
    .then(() => res.redirect("/recommendations"))
    .catch((error) => {
      console.log("Error processing form", error);
      res.render("recommendations/recom-create");

      next(error);
    });
});

// READ: Services details of a specific service
router.get("/recommendations/:id", (req, res, next) => {
  const { id } = req.params;

  Recom.findById(id)
    .populate({path: "creator"})
    .then((recommendationDetails) => {
      res.render("recommendations/recom-details", recommendationDetails);
    })
    .catch((error) => {
      console.log(
        "Error displaying details of a specific recommendation",
        error
      );
      next();
    });
});

// UPDATE COMMENT: 
router.post("/recommendations/:id", isLoggedIn, (req, res, next) => {
  const { id } = req.params;
  const { comment } =
  req.body;

  Recom.findByIdAndUpdate(id,
    {
      $push: {comments: {message:comment, creator: req.session.currentUser._id}}
    },
    { new: true }
  )
    .then(() => {
      res.redirect(`/recommendations/${id}`);
    })
    .catch((error) => {
      console.log(
        "Error displaying new comment",
        error
      );
      next();
    });
});

// UPDATE: display form to update a specific recommendation
router.get("/recommendations/:id/edit", isCreator, (req, res, next) => {
  const { id } = req.params;

  Recom.findById(id)
    .then((editRecommendation) => {
      // dropdown list of country selected
      const currentCountry = countryArr.find((countryName) => {
        if (countryName === editRecommendation.country) {
          return true;
        }
        return false;
      });

      res.render("recommendations/recom-edit", {
        recommendations: editRecommendation,
        countryArr: countryArr,
        currentCountry: currentCountry,
      });
    })
    .catch((error) => {
      console.log("Error displaying form for editing", error);
      next();
    });
});

// UPDATE: display form to actually update a specific recommendation
router.post("/recommendations/:id/edit", isCreator,  (req, res, next) => {
  const { id } = req.params;
  const { title, description, advice, country, city, image, comment } =
    req.body;

  // check if title, description and creator are provided
  if (title === "" || description === "") {
    res.status(400).render("recommendations/recom-create", {
      errorMessage:
        "All fields are mandatory. Please provide a title, description and creator's name.",
    });
    return;
  }

  Recom.findByIdAndUpdate(
    id,
    {
      title: title,
      description: description,
      advice: advice,
      country: country,
      city: city,
      image: image,
    },
    { new: true }
  )
    .then(() => res.redirect(`/recommendations/${id}`))
    .catch((error) => {
      console.log("Error displaying form for editing", error);
      next();
    });
});

// DELETE: route to delete a posted recommendation from the db
router.post("/recommendations/:id/delete", isCreator, (req, res, next) => {
  const { id } = req.params;

  Recom.findByIdAndDelete(id)
    .then(() => res.redirect("/recommendations"))
    .catch((error) => next(error));
});

module.exports = router;
