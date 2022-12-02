const express = require('express');
const router = express.Router();

const { authenticate } = require('../middleware/authenticate');

const authRouter = require('./auth.router');
const slotsRouter = require('./slots.router');
const bookingsRouter = require('./bookings.router');

router.use('/auth', authRouter);
router.use('/slots', authenticate, slotsRouter);
router.use('/bookings', authenticate, bookingsRouter);

router.get('/', function (req, res) {
    res.status(200).send(`Welcome to to api`);
});

module.exports = router;