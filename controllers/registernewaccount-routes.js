const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    var id = req.params.id;

        res.render('registeraccount', {});
  

   // res.render('registeraccount');
});

module.exports = router;