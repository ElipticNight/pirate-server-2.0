const cors = require('cors');
var express = require('express'),
    router = express.Router();

    router.get('/', cors(), (req, res) => {
      res.send('Hello World!')
    })

    router.post('/createroom', cors(), (req, res) => {
      res.send('abcd')
    })

module.exports = router;