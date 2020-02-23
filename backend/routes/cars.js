//  route file for user 
const express = require('express');
const router = express.Router();
const config = require('config');

const Car = require("../models/Car");



//route to get all cars from db

router.get("/", async (req, res) => {


  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')

  }

});




//route to post a new car, is asynchronous and saves a new car to the db from the request body

router.post("/", async (req, res) => {

  // saving car to variable from the request body
  const {
    model,
    make,
    owner,
    registration
  } = req.body;

  try {

    let car = new Car({
      model,
      make,
      owner,
      registration
    });

    //saving new car to DB

    await car.save();

    console.log("car added")

  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')

  }


});


//route to delete specific car by id

router.delete("/:id", async (req, res) => {

  try {

    let id = req.params.id;
    console.log(id)
    // getting specific car from DB by id
    let car = await Car.findById(id)
    if (!car) return res.status(404).json({
      msg: 'Car not found'
    });

    await Car.findByIdAndRemove(id);

    res.json({
      msg: "Car deleted successfully"
    })

    res.json(car)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }

});


//route to edit car

router.put("/:id", async (req, res) => {

  // saving car to variable from the request body
  const {
    model,
    make,
    owner,
    registration
  } = req.body;
  //building car object with params
  const carFields = {};
  if (model) carFields.model = model;
  if (make) carFields.make = make;
  if (owner) carFields.owner = owner;
  if (registration) carFields.registration = registration;

  try {

    let id = req.params.id;
    console.log(id)
    // using the id parameter to find the specific car
    let car = await Car.findById(id)
    if (!car) return res.status(404).json({
      msg: 'Car not found '
    });
    car = await Car.findByIdAndUpdate(id, {
      $set: carFields
    }, {
      new: true
    });
    res.json(car)

  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }




});

module.exports = router;