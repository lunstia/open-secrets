# open-secrets

## Introduction

Open Secrets is a messaging board that only allows its members to post. The twist however, is that any outsider cannot see the post nor author of its post.
Of course this can be changed by the poster with two options that are: Hide User and Hide Post.
On signup, you must enter a secret code which for now is hidden in the html file!

## What I used
Languages: Javascript, HTML, CSS\n
Libraries: Express, Mongoose, PassportJS, Socket.IO, bcrypt\n
Views: Pug

## Features
- Authentication with passportJS and bcrypt: You can sign up, log in, and have your session stick with you throughout the entire site.
- Websocket implementation with Socket.IO. It is a basic implementation that refreshes the page for the user while saving their form details for user experience.
- Message fellow members and have outsiders see those messages as well! This is implemented with express, express-validation, and mongoose (mongoDB library).
- A higher priviledged user, an admin, that has the ability to delete posts and make other admins.