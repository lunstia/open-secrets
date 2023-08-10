const express = require('express');
const index = require('../controllers/index');
const router = express.Router()

router.get('/', index.chat_get);

router.get('/login', (req, res, next) => {
    if (res.locals.currentUser) {
        res.redirect('/');
        return
    }
    let message;
    if (req.session.messages) {
        message = req.session.messages[0];
        req.session.messages = null;
    }
    
    res.render('log-in', {message: message})
})

router.post('/login', index.login_post);

router.get('/signup', (req, res, next) => {
    if (res.locals.currentUser) {
        res.redirect('/');
        return
    }
    res.render('sign-up');
})

router.post('/signup', index.signup_post);

router.get('/logout', index.logout_get);

router.post('/chat', index.chat_post);

router.post('/delete', index.chat_delete);

router.get('/admin', index.admin_get);

router.post('/admin', index.admin_post);

module.exports = router;