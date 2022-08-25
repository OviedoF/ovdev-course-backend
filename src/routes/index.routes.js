const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('holi bienvenido');
})

module.exports = router;
