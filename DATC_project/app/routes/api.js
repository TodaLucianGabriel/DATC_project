var User = require("../models/user");
var Location = require("../models/location");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt-nodejs");

module.exports = function (router) {
  //http://localhost:8080/users
  var router = require("express").Router();
  router.post("/register", function (req, res) {
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    if (
      req.body.username == null ||
      req.body.username == "" ||
      req.body.password == null ||
      req.body.password == "" ||
      req.body.email == null ||
      req.body.email == ""
    ) {
      res.send("Ensure username,email and password were provided");
    } else {
      user.save((err, registeredUser) => {
        if (err) {
          res.send("Username or email already exists");
        } else {
          let payload = { subject: registeredUser._id };
          let token = jwt.sign(payload, "secretKey");
          res.status(200).send({ token, user });
          //res.send("User created");
        }
      });
    }
  });

  router.post("/login", function (req, res) {
    var userData = req.body;
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;

    User.findOne({ email: userData.email }, (err, user) => {
      if (err) {
        console.log(error);
      } else {
        if (!user) {
          res.status(401).send("Invalid email");
        } else if (!bcrypt.compareSync(userData.password, user.password)) {
          res.status(401).send("Invalid Password");
        } else {
          let payload = { subject: User._id };
          let token = jwt.sign(payload, "secretKey");
          res.status(200).send({ token, user });
        }
      }
    });
  });

  router.post("/location", function (req, res) {
    var data = new Location();
    data.id = req.body.id;
    data.position = JSON.stringify(req.body.position);
    data.description = req.body.description;

    data.save((err, locationData) => {
      if (err) {
        console.log(err);
        res.send("Location doesn't save");
      } else {
        res.status(200);
        res.send({ message: "Success" });
      }
    });
  });

  router.get("/location", function (req, res) {
    Location.find({}, (err, location) => {
      if (err) {
        console.log(error);
      } else {
        res.send(location);
      }
    });
  });

  router.delete("/location/:id", function (req, res) {
    var id = req.params.id;
    console.log(id);
    Location.deleteOne({ id: id }, (err, location) => {
      if (err) {
        console.log(error);
      } else {
        res.status(200);
        res.send({ message: "Success" });
      }
    });
  });

  router.get("/users", function (req, res) {
    User.find({}, (err, user) => {
      if (err) {
        console.log(error);
      } else {
        res.send(user);
      }
    });
  });

  router.delete("/users/:username", function (req, res) {
    var username = req.params.username;
    //console.log(id);
    User.deleteOne({ username: username }, (err, user) => {
      if (err) {
        console.log(error);
      } else {
        res.status(200);
        res.send({ message: "Success! The user was deleted!" });
      }
    });
  });

  return router;
};

//   if (
//     req.body.username == null ||
//     req.body.username == "" ||
//     req.body.password == null ||
//     req.body.password == "" ||
//     req.body.email == null ||
//     req.body.email == ""
//   ) {
//     res.send("Ensure username,email and password were provided");
//   } else {
//     user.save(function (err) {
//       if (err) {
//         res.send("Username or email already exists");
//       } else {
//         res.send("User created");
//       }
//     });
//   }
// });
