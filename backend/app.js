const express = require("express");
const connectDB = require("./config/db");
const app = express();


// connect to DB
connectDB();

// Init middleware
app.use(express.json({
    extended: false
}));


app.get('/', (req, res) => res.json({
    msg: "Welcome to the Car API"
}));




// defining routes
app.use('/api/cars', require('./routes/cars'))



const PORT = process.env.port || 8080

app.listen(`${PORT}`, () => {
    console.log(`Car server started successfully in port ${PORT}`);
});