const express = require('express');
const router = express.Router();
const User   = require("../models/User");


router.get('/', function (req, res) {
  var id = req.params.id;

      res.render('login', {});

});


router.post("/", async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const userData = await User.create(req.body);
   
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      console.log("Session: ", req.session);
      res.status(200).json(userData);
    });
  } catch (err) {
    console.log('Signup error:', err);
    res.status(400).json(err);
  }
});



module.exports = router;
