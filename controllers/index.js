const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
const Post = require('../models/Post');
const {emit} = require('../utils/socket-io');
const { isObjectIdOrHexString } = require('mongoose');

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

exports.chat_get = asyncHandler( async (req, res, next) => {
    const posts = await Post.find().sort({date: 1}).limit(50).populate('user', 'username admin').exec()
    res.render('index', {posts: posts})
})

exports.chat_post = [
    body("post").trim().isLength({min: 1, max: 1000}).escape(),
    body("hideAuthor").escape(),
    body("hidePost").escape(),
    asyncHandler( async (req, res, next) => {
        if (!res.locals.currentUser) {
            res.redirect('/login');
            return
        }

        const hasHideAuthor = req.body.hideAuthor === 'on' ? true : false
        const hasHidePost = req.body.hidePost === 'on' ? true : false

        const post = new Post({
            user: res.locals.currentUser._id,
            post: req.body.post,
            hideAuthor: hasHideAuthor,
            hidePost: hasHidePost
        })

        await post.save()

        emit('chat message');

        res.redirect('/');
    })
];

exports.chat_delete = asyncHandler(async (req, res, next) => {
    const currentUser = res.locals.currentUser
    if (currentUser && currentUser.admin) {
        await Post.findByIdAndDelete(req.body.id).exec()
        emit('chat message');
        return
    }
    res.send('INVALID PERMISSIONS')
})

exports.admin_get = asyncHandler(async (req, res, next) => {
    const currentUser = res.locals.currentUser
    if (currentUser && currentUser.admin) {
        const users = await User.find().exec()

        res.render('admin', {users: users});
        return
    }

    res.redirect('/')
})

exports.admin_post = asyncHandler(async (req, res, next) => {
    const currentUser = res.locals.currentUser
    if (currentUser && currentUser.admin) {
        const makeAdmin = req.body.makeAdmin === 'on' ? true : false
        const user = await User.findByIdAndUpdate(req.body.user, {_id: req.body.user, admin: makeAdmin})
        res.redirect('/');
        return
    }

    res.send('INVALID PERMISSIONS')
})