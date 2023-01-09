const router = require("express").Router();

const Service = require("../models/Service.model");
// const countryArr = require("../data/countries.js"); // array of country list

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
router.get("/services/create", (req, res, next) => {
  Service.find()
    .then((servicesArr) => {
      res.render("services/service-create", { servicesArr });
    })
    .catch((error) => {
      console.log("Error displaying form", error);
      next();
    });
});

//CREATE: process form
router.post("/services/create", (req, res, next) => {
  const {
    title,
    description,
    country,
    language,
    date,
    serviceType,
    image,
    creator,
  } = req.body;

  Service.create({
    title,
    description,
    country,
    language,
    date,
    serviceType,
    image,
    creator,
  })
    .then(() => res.redirect("/services"))
    .catch((error) => {
      console.log("Error processing form", error);
      res.render("services/service-create");

      next(error);
    });
  // const {title, description, country, city, language, dateFrom, dateTo, serviceType, image, creator} = req.body;

  // check if title, description and creator are provided
  if (title === "" || description === "" || creator === "") {
    res.status(400).render("services/service-create", {
      errorMessage:
        "All fields are mandatory. Please provide a title, description and creator's name.",
    });
    return;
  }

  Service.create({
    title,
    description,
    country,
    city,
    language,
    dateFrom,
    dateTo,
    serviceType,
    image,
    creator,
  })
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

// UPDATE: display form to update a specify service
router.get("/services/:id/edit", (req, res, next) => {
  const { id } = req.params;

  Service.findById(id)
    // .populate('country', 'language', 'serviceType', 'dateFrom', 'dateTo')
    .then((editService) => {
      res.render("services/service-edit", { services: editService });
    })
    .catch((error) => {
      console.log("Error displaying form for editing", error);
      next();
    });
});

// UPDATE: display form to actually update a specify service
router.post("/services/:id/edit", (req, res, next) => {
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
    },
    { new: true }
  )
    .then(() => res.redirect(`/services/${id}`))
    .catch((error) => {
      console.log("Error displaying form for editing", error);
      next();
    });
});

// DELETE: route to delete a posted service from the db
router.post("/services/:id/delete", (req, res, next) => {
  const { id } = req.params;

  Service.findByIdAndDelete(id)
    .then(() => res.redirect("/services"))
    .catch((error) => next(error));
});

module.exports = router;
