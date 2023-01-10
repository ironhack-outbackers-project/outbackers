const Service = require("../models/Service.model");

module.exports = (req, res, next) => {
  const {id} = req.params;

  Service.findById(id)
    .then((services) => {
      if(req.session.currentUser._id != services.creator.toString()) {
        return res.redirect("/services");
      }
      next();
    })
    .catch((error) => {
      console.log(error);
      next();
    });
}