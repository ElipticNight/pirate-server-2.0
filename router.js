const Room = require('./room');

const cors = require('cors');
var express = require('express'),
  router = express.Router();
  router.use(cors());
  router.use(express.json())

  router.post('/createroom', cors(), (req, res) => {
    (async() => {
      res.send(await Room.createRoom(req.body));
    })();
  })

module.exports = router;
