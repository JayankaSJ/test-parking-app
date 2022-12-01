var mongoose = require('mongoose');
var { Schema } = require('mongoose');
const humanizeDuration = require("humanize-duration");

var schemaOptions = {
    toObject: {
        virtuals: true
    }
};

const bookingSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    areaId: {
        type: Number,
        required: true
    },
    slot: {
        type: Schema.Types.ObjectId,
        ref: 'Slot',
        required: true
    },
    timeFrom: {
        type: Date,
        required: true
    },
    timeTo: {
        type: Date,
        required: true
    }
}, schemaOptions);

bookingSchema.set('toObject', {
    transform: function (doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
    }
})

bookingSchema.virtual('duration').get(function () {
    const duration = this.timeTo.getTime() - this.timeFrom.getTime();
    return humanizeDuration(duration, { units: ["d", "h", "m"], maxDecimalPoints: 0 });
});

module.exports = mongoose.model('Booking', bookingSchema);