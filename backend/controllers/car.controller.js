const mongoose = require("mongoose");
const Car = require("../models/car.model");

exports.findAll = function (req, res) {
    Car.find(function (err, cars) {


        if (err) {
            console.log(err)
            res.status(500).send({
                message: "There was an error retrieving the cars"
            });
        } else {
            res.send(cars)
        }
    });
}