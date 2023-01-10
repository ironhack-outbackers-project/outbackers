const router = require("express").Router();

const Service = require("../models/Service.model");
const User = require("../models/User.model");

// Require necessary (isLoggedOut and isLoggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const isCreator = require("../middleware/isCreator");

// Require Country and Language List
const countryArr = require("../data/countries.js");
const languageArr = require("../data/languages.js");

// READ: display list of services
router.get("/services", (req, res, next) => {
  Service.find()
    .then((servicesFromDB) => {
      res.render("services/services-list", { services: servicesFromDB });
    })
    .catch((error) => {
      console.log("Error displaying all services", error);
      next(error);
    });
});

// CREATE: display form
router.get("/services/create", isLoggedIn, (req, res, next) => {
  Service.find()
    .then((servicesArr) => {
      res.render("services/service-create", { 
        servicesArr: servicesArr, 
        countryArr: countryArr, 
        languageArr: languageArr 
      });
    })
    .catch((error) => {
      console.log("Error displaying form", error);
      next();
    });
});

//CREATE: process form
router.post("/services/create", isLoggedIn, (req, res, next) => {
    const {title, description, country, city, language, dateFrom, dateTo, serviceType, image, posts} = req.body;

    const creator = req.session.currentUser._id;

  // check if title, description and creator are provided
  if (title === "" || description === "" || creator === "") {
    res.status(400).render("services/service-create", {
      errorMessage:
        "All fields are mandatory. Please provide a title, description and creator's name.",
    });
    return;
  }

    Service.create({title, description, country, city, language, dateFrom, dateTo, serviceType, image, creator, posts})
    // .populate('creator')
    .then(() => res.redirect("/services"))
    .catch((error) => {
      console.log("Error processing form", error);
      res.render("services/service-create");

      next(error);
    });
});

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

// UPDATE: display form to update a specific service
router.get("/services/:id/edit", isCreator, (req, res, next) => {
  const { id } = req.params;

  Service.findById(id)
    .then((editService) => {
      // dropdown list of country selected
      const currentCountry = countryArr.find((countryName) => {
        if(countryName === editService.country){
          return true;
        }
        return false;
      })

      // dropdown list of languages selected
      const spokenLanguages = languageArr.map((name) => {
        const lang = {
          name, 
          isSpoken: editService.language.includes(name)
        }
        return lang;
      })

      res.render("services/service-edit", { 
        service: editService, 
        countryArr: countryArr, 
        currentCountry: currentCountry,
        spokenLanguages: spokenLanguages

      });

    })
    .catch((error) => {
      console.log("Error displaying form for editing", error);
      next();
    });
});

// UPDATE: display form to actually update a specific service
router.post("/services/:id/edit", isCreator, (req, res, next) => {
  const { id } = req.params;
  const {title, serviceType, description, country, city, language, dateFrom, dateTo, image, creator} = req.body;

  // check if title, description and creator are provided
  if (title === "" || description === "") {
    res.status(400).render("services/service-create", {
      errorMessage:
        "All fields are mandatory. Please provide title and description ",
    });
    return;
  }

  Service.findByIdAndUpdate(id, {title, serviceType, description, country, city, language, dateFrom, dateTo, image, creator}, { new: true })
    .then(() => res.redirect(`/services/${id}`))
    .catch((error) => {
      console.log("Error displaying form for editing", error);
      next();
    });
});

// DELETE: route to delete a posted service from the db
router.post("/services/:id/delete", isCreator, (req, res, next) => {
  const { id } = req.params;

  Service.findByIdAndDelete(id)
    .then(() => res.redirect("/services"))
    .catch((error) => next(error));
});

module.exports = router;
