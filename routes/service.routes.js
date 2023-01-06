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
    const {title, description, country, city, language, date, serviceType, image, creator} = req.body;

    Service.create({title, description, country,city, language, date, serviceType, image, creator})
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

// UPDATE: display form to update a specify service
router.get("/services/:id/edit", (req, res, next) => {
    const {id} = req.params;

    Service.findById(id)
    .then(editService => {
        res.render("services/service-edit", {services: editService});
    })
    .catch(error => {
        console.log('Error displaying form for editing', error);
        next();
    })
})

// UPDATE: display form to actually update a specify service
router.post("/services/:id/edit", (req, res, next) => {
    const {id} = req.params;
    const {title, serviceType, description, country, city, language, date, image, creator} = req.body;

    Service.findByIdAndUpdate(id, {title, serviceType, description, country, city, language, date, image, creator}, {new: true})
    .then(() => res.redirect(`/services/${id}`))
    .catch(error => {
        console.log('Error displaying form for editing', error);
        next();
    })
})

// DELETE: route to delete a posted service from the db
router.post('/services/:id/delete', (req, res, next) => {
    const { id } = req.params;
   
    Service.findByIdAndDelete(id)
      .then(() => res.redirect('/services'))
      .catch(error => next(error));
  });

module.exports = router;