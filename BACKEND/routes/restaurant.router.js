const express = require('express');
const response = require('../lib/response-message');
const log = require('../lib/log-messages');

const restaurantController = require('../controllers/restaurant.controller');

const router = express.Router();

router.post('/platos', (req, res) => {
    const { body } = req;
    restaurantController.postRestaurant(body)
      .then( result => {
        response(res, { code: result.code, key: "message", payload: result.message});
      })
      .catch(error => {
        log.logError(error);
        response(res, {code: error.code, key: "message", payload: error.message})
      });
  });

  router.get('', (req, res) => {
    const { size } = req.query;
    restaurantController.getRestaurant(size)
      .then( restaurant => {
        response(res, {code: 200, key: "restaurants", payload:  restaurant})
      })
      .catch(error => {
        log.logError(error.log);
        response(res, {code: error.code, key: "message", payload: error.message})
      });
  });


  router.put('/:id', (req, res) => {
    const {  restaurantID } = req.params;
    const { body } = req;
    restaurantController.putRestaurant( restaurantID, body)
      .then(result => {
        response(res, {code: result.code, key: "message", payload: result.message})
      })
      .catch(error => {
        log.logError(error);
        response(res, {code: error.code, key: "message", payload: error.message})
      });
  });

  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    restaurantController.deleteRestaurant(id)
      .then(result => {
        response(res, {code: result.code, key: "message", payload: result.message})
      })
      .catch(error => {
        log.logError(error);
        response(res, {code: error.code, key: "message", payload: error.message})
      })
  });
  module.exports = router;