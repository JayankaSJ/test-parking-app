const express = require('express');
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId; 
const router = express.Router();
const Booking = require('../models/booking');
const Slot = require('../models/slot');


router.get('/', function (req, res) {
    const { userId } = req;
    Booking
        .find({ user: userId })
        .populate('slot')
        .sort({ timeFrom: "asc" })
        .exec(function (err, result) {
            if (err) {
                res.status(500).json(err);
            } else {
                const items = result.map(o => o.toObject({ virtuals: true }));
                res.status(200).json(items);
            }
        }, { sort: { areaId: 1, index: 1 } })
});

router.post('/', async function (req, res) {
    const { user: { id: userId }, body } = req;

    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const booking = new Booking({
            ...body,
            slot: body.slotId,
            user: userId
        });
        await booking.save({session});

        await Slot.findOneAndUpdate({ _id: ObjectId(body.slotId) }, { $set: { isAllocated: true } }, { new: true, session });

        await session.commitTransaction();

        res.status(200).json(booking.toObject());
    }
    catch (err) {
        await session.abortTransaction();
        res.status(500).json(err);
    }
    finally {
        session.endSession();
    }
});

module.exports = router;