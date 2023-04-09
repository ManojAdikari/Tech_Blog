const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    var id = req.params.id;
  
        res.render('login', {});
  

    
});

module.exports = router;