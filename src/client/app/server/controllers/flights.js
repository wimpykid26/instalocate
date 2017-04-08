const flights = require('../models').flights;

module.exports = {
  create(req, res) {
    return flights
    .create({
      name: req.body.name,
      source: req.body.source,
      dest: req.body.dest,
      departure: req.body.departure,
      arrival: req.body.arrival,
      eta: req.body.eta,
      airline: req.body.airline,
      date: req.body.date
    })
    .then(flights => res.status(201).send(flights))
    .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return flights
    .all()
    .then(flights => res.status(200).send(flights))
    .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return flights
    .findOne({
      where : {name : req.params.flightName}
    })
    .then(flights => {
      if (!flights) {
        return res.status(404).send({
          message: 'flight Not Found',
        });
      }
      return res.status(200).send(flights);
    })
    .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return flights
    .findById(req.params.flightId, {
    })
    .then(flights => {
      if (!flights) {
        return res.status(404).send({
          message: 'flights Not Found',
        });
      }
      return flights
      .update({
        name: req.body.name || flights.name,
        departure: req.body.departure || flights.departure,
        arrival: req.body.arrival || flights.arrival,
        eta: req.body.eta || flights.eta,
      })
      .then(() => res.status(200).send(flights))  // Send back the updated flights.
      .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
  },
};
