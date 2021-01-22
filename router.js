const Channel = require('./channel');

const cors = require('cors');
var express = require('express'),
  router = express.Router();

  router.get('/', cors(), (req, res) => {
    res.send('Hello World!')
  })

  router.post('/createroom', cors(), (req, res) => {
    res.send(Channel.createRoom())
  })

module.exports = router;