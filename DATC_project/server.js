var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var morgan = require("morgan");
var mongoose = require("mongoose");
var cors = require("cors");
var router = require("express");

var appRoutes = require("./app/routes/api")(router);
//var path = require("path");

//Middleware
app.use(morgan("dev"));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(express.static(__dirname + "/public"));
app.use(cors());
app.use("/api", appRoutes);

mongoose.set("strictQuery", false);

//DB connection
mongoose.connect(
  "mongodb+srv://luci:test123@cluster0.cy6cjg1.mongodb.net/?retryWrites=true&w=majority",
  function (err) {
    if (err) {
      console.log("Not connected to the database: " + err);
    } else {
      console.log("Succesfully connected to MongoDB");
    }
  }
);

app.get("*", function (req, res) {
  res.send("Salut Lucica , ti-a mers serverul");
});

app.listen(port, function () {
  console.log("Running the server on port " + port);
});
