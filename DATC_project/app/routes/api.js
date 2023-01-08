var User = require("../models/user");
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
