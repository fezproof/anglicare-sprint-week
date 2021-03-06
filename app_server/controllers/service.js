const mongoose = require('mongoose');

const Service = mongoose.model('Service');


module.exports.service = (req, res) => {
  res.render('service');
};

module.exports.addService = (req, res) => {
  if (req.session.user === undefined) {
    res.json({ message: 'no service was found, remember this request should only be made by authenticated users' });
  }

  const { name } = req.session.user;

  const { description } = req.body;
  if (description === undefined) {
    res.json({ message: 'No description was provided please provide one' });
  }

  const availability = req.body.available ? 'true' : 'false';
  console.log(req.body);
  const service = new Service();
  service.name = name;
  service.description = description;
  service.availability = availability;
  service.save((err) => {
    if (err) {
      res.json({ message: err });
    } else {
      res.redirect('/locations/short_term');
    }
  });
  // res.json({"message": "WOAH this line of code shouldn't of been executed"});
};

module.exports.dashboard = (req, res) => {
  res.send('This is the Services Dashboard page, rendered by the service.js Controller');
};

module.exports.profile = (req, res) => {
  res.send('This is the Services Profile Page, rendered by the service.js Controller');
};
