const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function userController() {
  return {
    //handle create data
    store(req, res, next) {
      const userEmail = req.body.userEmail;
      const password = req.body.password;
      // password hash
      bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
          return res.json({
            message: "Something Wrong! Try Later",
            Error: err,
          });
        } else {
          const userDtails = new user({
            userEmail: userEmail,
            password: hash,
          });
          const data = userDtails
            .save()
            .then((dok) => {
              res.status(201).json({
                message: "User Resister Successfully",
                user: dok,
              });
            })
            .catch((err) => {
              res.status(400).json(err);
            });
        }
      });
    },

    login(req, res, next) {
      const userEmail = req.body.userEmail;
      user
        .find({ userEmail: userEmail })
        .exec()
        .then((user) => {
          if (user.length < 1) {
            res.status(404).json({
              message: "Auth Failed",
            });
          } else {
            bcrypt.compare(
              req.body.password,
              user[0].password,
              function (err, result) {
                if (err) {
                  res.status(404).json({
                    message: "Auth Failed",
                  });
                }
                if (result) {
                  //generate token
                  const token = jwt.sign(
                    {
                      userEmail: user[0].userEmail,
                      userid: user[0]._id,
                    },
                    "secret",
                    {
                      expiresIn: "8h",
                    }
                  );
                  res.status(200).json({
                    message: "User Found",
                    token: token,
                  });
                } else {
                  res.status(404).json({
                    message: "Auth Failed",
                  });
                }
              }
            );
          }
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    },
  };
}
module.exports = userController;
