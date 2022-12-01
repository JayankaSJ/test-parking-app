const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require('../models/user');
const config = require('../config').get(process.env.NODE_ENV);

// user sign in
router.post('/sign-in', function (req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new Error('Email and password required!');
    }
    User.findOne({ 'email': username }, function (err, user) {
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password!' });
        }

        user.comparePassword(password, (err, isMatch) => {
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid username or password!" });
            }

            const payload = {
                user: { 
                    id: user.id, 
                    email: user.email 
                }
            };
            jwt.sign(payload, config.SECRET, (err, accessToken) => {
                res.json({
                    accessToken
                });
            });
        });
    });
});

module.exports = router;