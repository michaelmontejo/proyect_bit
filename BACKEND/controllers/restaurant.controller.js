const restaurantServices = require('../services/restaurants.service');

const postRestaurant = (body) => new Promise((resolve, reject) => {
    try {
      resolve( restaurantServices.createRestaurant(body) );
    } catch (error) {
      reject(error);
    }
  });

  const getRestaurant = (size) => new Promise((resolve, reject) => {
    try {
      let Restaurants = [];
      Restaurants = restaurantServices.readRestaurant()
      if(size){
        resolve(Restaurants.slice(0, size));
      }else{
        resolve( Restaurants );
      }
    } catch (error) {
      reject({code: 500, message: "Error unexpected", log: error });
    }
  });

  const putRestaurant = (restaurantID, body) => new Promise((resolve, reject) => {
    try {
      resolve( restaurantServices.updateRestaurant(restaurantID, body) );
    } catch (error) {
      reject(error);
    }
  });
  
  const deleteRestaurant = (id) => new Promise((resolve, reject) => {
    try {
      resolve( restaurantServices.deleteRestaurant(id) );
    } catch (error) {
      reject(error);
    }
  });
  

  module.exports = {
    
    postRestaurant,
    getRestaurant,
    putRestaurant,
    deleteRestaurant

  }