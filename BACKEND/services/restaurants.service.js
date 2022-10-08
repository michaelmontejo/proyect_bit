const restaurantSchema = require('../models/restaurant.model');

const createRestaurant = (restaurant) => new Promise((resolve, reject) => {
    const restaurantDB = restaurantSchema(restaurant);
    restaurantDB.save()
      .then(() => resolve({code: 201, message: "plato del restaurante de su hotel ha sido creado"}) )
      .catch((error) => reject({code: 500, message: error}) );
  });

  const readRestaurant = () => new Promise((resolve, reject) => {
    restaurantSchema.find()
      .then((restaurant) => resolve( restaurant ))
      .catch((error) => reject({code: 500, message: error}))
  });

  
  const updateRestaurant = (id, restaurant) => new Promise((resolve , reject) => {
    restaurantSchema.findByIdAndUpdate(id, restaurant)
      .then(() => resolve({code: 201, message: "el plato de su restaurante fue actualizado"}) )
      .catch((error) => reject({code: 500, message: error}) );
  });

  const deleteRestaurant = (id) => new Promise((resolve , reject) => {
    restaurantSchema.findByIdAndDelete(id)
      .then(() => resolve({code: 200, message: "el plato del restaurante fue eliminado"}) )
      .catch((error) => reject({code: 500, message: error}) );
  });
  

  
  module.exports = {
    createRestaurant,
    readRestaurant,
    updateRestaurant,
    deleteRestaurant
  }