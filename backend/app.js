const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));


const car = require('./controllers/car.controller.js');
app.get('/', car.findAll);





const mongoose = require('mongoose');
const uri = 'mongodb+srv://max123:max123@cluster0-auofe.mongodb.net/test?retryWrites=true&w=majority';
mongoose.Promise = global.Promise;
mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true

});
mongoose.connection.on('error', function () {
    console.log('Connection to Mongo established.');
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});
mongoose.connection.once('open', function () {
    console.log("Successfully connected to the database");
});

// making the server listen in port 8080 using a variable
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});