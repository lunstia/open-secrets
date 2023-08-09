const express = require('express');
const router = express.Router()

router.get('/', (req, res, next) => {
    res.render('index')
})

router.get('/login', (req, res, next) => {
    res.send('LOGIN NOT IMPLEMENTED');
})

router.get('/signup', (req, res, next) => {
    res.send('SIGNUP NOT IMPLEMENTED');
})

module.exports = router;