const router = require("express").Router();

const Service = require("../models/Service.model");

// READ: display list of services
router.get('/services', (req, res, next) => {

    Service.find()
      .then(servicesFromDB => {
        res.render('services/services-list', {services: servicesFromDB});
      })
      .catch(error => {
        console.log('Error displaying all services', error);
        next(error);
      });
  });

// CREATE: display form
router.get("/services/create", (req, res, next) => {

    Service.find()
    .then((servicesArr) => {
        res.render("services/service-create", { servicesArr });
    })
    .catch(error => {
        console.log('Error displaying form', error);
        next();
    })
});

//CREATE: process form
router.post("/services/create", (req, res, next) => {
    const {title, description, country, language, date, serviceType, image, creator} = req.body;

    Service.create({title, description, country, language, date, serviceType, image, creator})
    .then(() => res.redirect("/services"))
        .catch(error => {
            console.log("Error processing form", error);
            res.render('services/service-create')
            
            next(error);
        })
});

// READ: Services details of a specific service
router.get("/services/:id", (req, res, next) => {
    const {id} = req.params;
    
    Service.findById(id)
    .then(serviceDetails => {
        res.render("services/services-details", serviceDetails);
    })
    .catch(error => {
        console.log("Error displaying details of a specific service", error);
        next();
    })
});

module.exports = router;