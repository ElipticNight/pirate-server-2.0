const Channel = require('./channel');

const cors = require('cors');
var express = require('express'),
  router = express.Router();
  router.use(cors());
  router.use(express.json())

  router.get('/', (req, res) => {
    res.send('Hello World!')
  })

  router.post('/createroom', cors(), (req, res) => {
    res.send(Channel.createRoom(req.body))
  })

module.exports = router;