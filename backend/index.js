const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

const db = require('./config').get(process.env.NODE_ENV);
const routes = require('./routes');
const globalErrorHandler = require('./middleware/globalErrorHandler');
const globalResponseHandler = require('./middleware/globalResponseHandler');

// app use
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(globalResponseHandler);
app.use('/api', routes);
app.use(globalErrorHandler);

// database connection

const mongooseConfig = {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    retryWrites: false,
    family: 4
};

mongoose.Promise = global.Promise;
mongoose.connect(db.DATABASE, mongooseConfig, function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("database is connected");
    }
});

// listening port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`app is live at ${PORT}`);
});