const express = require('express');
const createError = require('http-errors');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require('path');

const index = require('./routes/index');
const chat = require('./routes/chat');

mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const app = express()

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({ secret: process.env.SECRET_KEY, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use("/", index);
app.use('/chat', chat);

app.use((req, res, next) => {
    next(createError(404));
})

app.use((err, req, res, next) => {
    res.send(err)
})

app.listen(3000, ()=>console.log('listening on port 3000!'));