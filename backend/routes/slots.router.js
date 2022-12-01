const express = require('express');
const router = express.Router();
const Slot = require('../models/slot');

router.get('/', function (req, res) {
    Slot.find({}).sort({ areaId: "asc", index: "asc" }).exec(function (err, result) {
        if (err) {
            res.status(500).json(err);
        } else {
            const items = result.map(o => o.toObject());
            res.status(200).json(items);
        }
    }, { sort: { areaId: 1, index: 1 } })
});

module.exports = router;