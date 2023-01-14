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
const servicesTypeArr = ['Job', 'Housing'];

// READ: display list of services
router.get("/services", (req, res, next) => {
  let {serviceType} = req.query;
  let {country} = req.query;

  let filter = {};
  if(serviceType) {
    filter = {serviceType: {$eq: serviceType}}
  }

  if(country) {
    const includesCountry = countryArr.filter(countryArr => countryArr.toLowerCase().includes(country.toLowerCase()))
    filter = {country: {$in: includesCountry}}
  }

  Service.find(filter)
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
        languageArr: languageArr,
        servicesTypeArr: servicesTypeArr
      });
    })
    .catch((error) => {
      console.log("Error displaying form", error);
      next(error);
    });
});

//CREATE: process form
router.post("/services/create", isLoggedIn, (req, res, next) => {
    const {title, serviceType, description, country, city, language, date, image} = req.body;

    const creator = req.session.currentUser._id;

  // check if title and description are provided
  if (title === "" || description === "" ) {
    res.status(400).render("services/service-create", {
      errorMessage:
        "All fields are mandatory. Please provide a title, description and creator's name.",
    });
    return;
  }

    Service.create({title, serviceType, description, country, city, language, date, image, creator})
    
    .then(() => {
      res.redirect("/services")
    })
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
    .populate({ path: 'creator', select: '-password' })
    .then((serviceDetails) => {
      const isOwner = req.session?.currentUser?._id === serviceDetails.creator?._id.toString();
      
      res.render("services/services-details", {
        serviceDetails: serviceDetails,
        isOwner: isOwner
      });
    })
    .catch((error) => {
      console.log("Error displaying details of a specific service", error);
      next(error);
    });
});

// UPDATE: Comment
router.post("/services/:id", isLoggedIn, (req, res, next) => {
  const { id } = req.params;
  const { comment } = req.body;

  Service.findByIdAndUpdate(id, {$push: {comments: {
    message: comment,
    creator: req.session.currentUser._id,
    username: req.session.currentUser.username
  }}}, { new: true })
    .then((responseFromDB) => {
      console.log(responseFromDB);
      res.redirect(`/services/${id}`);
    })
    .catch((error) => {
      console.log("Error displaying new comment", error);
      next(error);
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
     
      // dropdown list of serviceType selected
      const serviceTypeChoosen = servicesTypeArr.find((serviceSelected) => {
        if(serviceSelected === editService.serviceType){
          return true;
        }
        return false;
      })

      res.render("services/service-edit", { 
        service: editService, 
        countryArr: countryArr, 
        currentCountry: currentCountry,
        spokenLanguages: spokenLanguages,
        servicesTypeArr: servicesTypeArr,
        serviceTypeChoosen: serviceTypeChoosen

      });

    })
    .catch((error) => {
      console.log("Error displaying form for editing", error);
      next(error);
    });
});

// UPDATE: display form to actually update a specific service
router.post("/services/:id/edit", isCreator, (req, res, next) => {
  const { id } = req.params;
  const {title, serviceType, description, country, city, language, date, image, creator} = req.body;

  // check if title, description and creator are provided
  if (title === "" || description === "") {
    res.status(400).render("services/service-create", {
      errorMessage:
        "All fields are mandatory. Please provide title and description ",
    });
    return;
  }

  const data = {title, serviceType, description, country, city, language, date, creator}

  if(image){
    data.image = image;
  }

  Service.findByIdAndUpdate(id, data, { new: true })
    .then(() => res.redirect(`/services/${id}`))
    .catch((error) => {
      console.log("Error displaying form for editing", error);
      next(error);
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
