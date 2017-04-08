const flightsController = require('../controllers').flights;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the flights API!',
  }));
  app.get('/api/flights', flightsController.list);
  app.get('/api/flights/:flightId', flightsController.retrieve);
  app.put('/api/flights/:flightId', flightsController.update);
  app.post('/api/flights', flightsController.create);
};
