const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

exports.signup_post = [
    body('secret', 'Secret is invalid').trim().custom(value => {
        return value === process.env.SECRET_CODE
    }).escape(),
    body('username').trim().isLength({min: 1}).custom(async value => {
        const user = await User.findOne({username: value});
        if (user) {
            throw new Error('Username is already in use');
        }
    }).escape(),
    body('password', "Password must be at least 8 characters long").trim().isLength({ min: 8 }).escape(),
    body('passwordConfirmation', "Passwords doesnt match").trim().custom((value, { req }) => {
        return value === req.body.password;
    }).escape(),
    asyncHandler(async (req, res, next) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.render('sign-up', {errors: result.errors[0].msg})
            return
        } else {
            
            const hash = await bcrypt.hash(req.body.password, Number(process.env.SALT_ROUNDS))
            const user = new User({username: req.body.username, password: hash})
            await user.save()

            res.redirect('/login');
        }
    })
]

exports.login_post = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true
})

exports.logout_get = (req, res, next) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  };
