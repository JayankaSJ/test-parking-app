var mongoose = require('mongoose');

const slotSchema = mongoose.Schema({
    index: {
        type: Number,
        required: true
    },
    virtualIndex: {
        type: Number,
        required: true
    },
    areaId: {
        type: Number,
        required: true
    },
    isEnabled: {
        type: Boolean,
        required: true
    },
    isAllocated: {
        type: Boolean,
        required: true
    }
});

slotSchema.set('toObject', {
    transform: function (doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
    }
})

module.exports = mongoose.model('Slot', slotSchema);