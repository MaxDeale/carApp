const Car = require('../models/car.model.js');
const mongoose = require('mongoose');

exports.create = function (req, res) {
    // Create and Save a new Car
    let newCar = new Car({
        model: req.body.model,
        make: req.body.make,
        owner: req.body.owner,
        registration: req.body.registration,
        address: req.body.address
    });
    newCar.save(function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: "Some error occurred while creating the car."
            });
        } else {
            console.log(data);
            res.send('The car has been added');
        }
    });
};


exports.findAll = function (req, res) {
    Car.find(function (err, blogs) {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: "Some error occurred while retrieving cars."
            });
        } else {
            res.send(cars);
        }
    });
}