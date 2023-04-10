const express = require('express');
const router = express.Router();
const User   = require("../models/User");
const session = require('express-session');


router.get('/', function (req, res) {
  var id = req.params.id;

      res.render('login', {});

});


// Login an existing user
router.post("/", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
       session.logged_in= true;

      console.log("Session: ", req.session);

      res
        .status(200)
      
        .json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Logout the user
router.post("/logout", (req, res) => {
  req.session.logged_in=true;
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
