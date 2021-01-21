var express = require('express'),
    router = express.Router();

    router.get('/', (req, res) => {
      res.send('Hello World!')
    })

    router.post('/test', (req, res) => {
      res.send('Hello test')
    })

module.exports = router;