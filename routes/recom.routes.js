const router = require("express").Router();

const Recom = require("../models/Recom.model");
//const User = require("../models/User.model");

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
// const isLoggedOut = require("../middleware/isLoggedOut");
// const isLoggedIn = require("../middleware/isLoggedIn");

// const countryArr = require("../data/countries.js"); // array of country list
// console.log(countryArr)

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
router.get("/recommendations/create", (req, res, next) => {
  Recom.find()
    .then((recommendationsArr) => {
      res.render("recommendations/recom-create", { recommendationsArr });
    })
    .catch((error) => {
      console.log("Error displaying form", error);
      next();
    });
});

//CREATE: process form
router.post(
  "/recommendations/create",
  /*isLoggedIn,*/ (req, res, next) => {
    const {
      title,
      description,
      advice,
      country,
      city,
      image,
      creator,
      // posts,
    } = req.body;

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
      // posts,
    })
      .then(() => res.redirect("/recommendations"))
      .catch((error) => {
        console.log("Error processing form", error);
        res.render("recommendations/recom-create");

        next(error);
      });
  }
);

// READ: Services details of a specific service
router.get("/services/:id", (req, res, next) => {
  const { id } = req.params;

  Service.findById(id)
    .then((serviceDetails) => {
      res.render("services/services-details", serviceDetails);
    })
    .catch((error) => {
      console.log("Error displaying details of a specific service", error);
      next();
    });
});

// UPDATE: display form to update a specify service
router.get(
  "/services/:id/edit",
  /*isLoggedIn,*/ (req, res, next) => {
    const { id } = req.params;

    Service.findById(id)
      .then((editService) => {
        res.render("services/service-edit", { services: editService });
      })
      .catch((error) => {
        console.log("Error displaying form for editing", error);
        next();
      });
  }
);

// UPDATE: display form to actually update a specify service
router.post(
  "/services/:id/edit",
  /*isLoggedIn,*/ (req, res, next) => {
    const { id } = req.params;
    const {
      title,
      serviceType,
      description,
      country,
      city,
      language,
      dateFrom,
      dateTo,
      image,
      creator,
      posts,
    } = req.body;

    // check if title, description and creator are provided
    if (title === "" || description === "" || creator === "") {
      res.status(400).render("services/service-create", {
        errorMessage:
          "All fields are mandatory. Please provide a title, description and creator's name.",
      });
      return;
    }

    Service.findByIdAndUpdate(
      id,
      {
        title,
        serviceType,
        description,
        country,
        city,
        language,
        dateFrom,
        dateTo,
        image,
        creator,
        posts,
      },
      { new: true }
    )
      .then(() => res.redirect(`/services/${id}`))
      .catch((error) => {
        console.log("Error displaying form for editing", error);
        next();
      });
  }
);

// DELETE: route to delete a posted service from the db
router.post("/services/:id/delete", (req, res, next) => {
  const { id } = req.params;

  Service.findByIdAndDelete(id)
    .then(() => res.redirect("/services"))
    .catch((error) => next(error));
});

module.exports = router;
