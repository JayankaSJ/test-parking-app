
var ObjectId = require('mongoose').Types.ObjectId; 
const jwt = require('jsonwebtoken');
const config = require('../config').get(process.env.NODE_ENV);
const User = require('./../models/user');

function extractToken(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
}

function authenticate(req, res, next) {
    const token = extractToken(req);
    if (!token) {
        return res.status(401).json({ message: 'Authorization header is required!' });
    }

    jwt.verify(token, config.SECRET, function (err, decoded) {
        if (err) {
            return res.status(401).json({ message: 'Authorization token is invalid!' });
        }
        const { user: { id } } = decoded;
        const userObjectId = ObjectId(id);
        User.findOne({ "_id": userObjectId }, function (err, user) {
            if (err || !user) {
                return res.status(401).json({ message: 'User not found!' });
            }
            req.user = user;
            req.userId = userObjectId;
            next();
        })
    });
}

module.exports = { authenticate };