const express = require("express");
const connectDB = require("./config/db");

const app = express();

app.use(express.static("public"));
// connecting to DB using config file

connectDB();

require("./routes/new")(app);
require("./routes/home")(app);

// making the server listen in port 8080 using a variable
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
