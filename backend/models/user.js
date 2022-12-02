const mongoose = require('mongoose');
const crypto = require('crypto');
const config = require('../config').get(process.env.NODE_ENV);

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.set('toObject', {
    transform: function (doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
    }
})

userSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
        const hash = crypto.createHash('sha256').update(user.password).digest('hex');
        user.password = hash;
    }
    next();
});

userSchema.methods.comparePassword = function (password, cb) {
    const passwordToBeCompared = crypto.createHash('sha256').update(password).digest('hex');
    cb(null, this.password === passwordToBeCompared);
}


module.exports = mongoose.model('User', userSchema);