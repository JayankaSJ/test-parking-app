const mongoose = require('mongoose');
const User = require('./models/user');
const Slot = require('./models/slot');
const db = require('./config').get(process.env.NODE_ENV);

const mongooseConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
    useFindAndModify: false,
    useCreateIndex: true
};

(async () => {
    mongoose.Promise = global.Promise;
    mongoose.connect(db.DATABASE, mongooseConfig, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("database is connected");
        }
    });

    await mongoose.connection.dropDatabase();

    await User.create([{
        username: 'user-1',
        email: 'user-1@parkingapp.com',
        password: 'CGBZS7fWd4wy'
    }]);

    const slots = [
        // area 1 slots
        ...Array(16).fill().map(i => (
            {
                areaId: 1,
                isEnabled: true,
                isAllocated: false
            }
        )),

        // area 2 slots
        ...Array(4).fill().map(i => (
            {
                areaId: 2,
                isEnabled: true,
                isAllocated: false
            }
        )),
        ...Array(2).fill().map(i => (
            {
                areaId: 2,
                isEnabled: false,
                isAllocated: false
            }
        )),
        ...Array(4).fill().map(i => (
            {
                areaId: 2,
                isEnabled: true,
                isAllocated: false
            }
        )),
        ...Array(4).fill().map(i => (
            {
                areaId: 2,
                isEnabled: false,
                isAllocated: false
            }
        )),
        ...Array(2).fill().map(i => (
            {
                areaId: 2,
                isEnabled: true,
                isAllocated: false
            }
        )),

        // area 3 slots
        ...Array(4).fill().map(i => (
            {
                areaId: 3,
                isEnabled: true,
                isAllocated: false
            }
        )),
        ...Array(3).fill().map(i => (
            {
                areaId: 3,
                isEnabled: false,
                isAllocated: false
            }
        )),
        {
            areaId: 3,
            isEnabled: true,
            isAllocated: false
        },
        ...Array(3).fill().map(i => (
            {
                areaId: 3,
                isEnabled: false,
                isAllocated: false
            }
        )),
        ...Array(2).fill().map(i => (
            {
                areaId: 3,
                isEnabled: true,
                isAllocated: false
            }
        )),
        ...Array(2).fill().map(i => (
            {
                areaId: 3,
                isEnabled: false,
                isAllocated: false
            }
        )),
        {
            areaId: 3,
            isEnabled: true,
            isAllocated: false
        }
    ].map((slot, index) => ({
        index: (index % 16) + 1,
        ...slot,
        virtualIndex: 0
    }));

    // define the virtual index
    slots.forEach(item => {
        const currentIndex = slots
            .filter(i => i.areaId === item.areaId && i.isEnabled)
            .map(item => item.virtualIndex)
            .reduce(function (prev, curr) {
                return prev < curr ? curr : prev;
            });

        item.virtualIndex = currentIndex + 1;
    });

    await Slot.create(slots);

    await mongoose.connection.close();
})();


