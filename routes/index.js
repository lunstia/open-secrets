const express = require('express');
const router = express.Router()

router.get('/', (req, res, next) => {
    res.render('index')
})

router.get('/login', (req, res, next) => {
    if (res.locals.currentUser) {
        res.redirect('/');
        return
    }
    res.render('log-in')
})

router.get('/signup', (req, res, next) => {
    if (res.locals.currentUser) {
        res.redirect('/');
        return
    }
    res.render('sign-up');
})

module.exports = router;