# Test - _Parking App_
## Installation

requires 
- [Node.js](https://nodejs.org/) v18+.
- [MongoDB](https://www.mongodb.com/try/download/community) v6+.

### Frontend

```sh
npm i
npm start
```

### Backend

```sh
npm i
npm start
```

### With Docker
```sh
docker-compose build & docker-compose up
```

### Test Credentials
username: user-1@parkingapp.com
password: CGBZS7fWd4wy

## Issues
Mongoose transactions have been used withing the backend. Mongo standalone instalations will give `MongoError: This MongoDB deployment does not support retryable writes. Please add retryWrites=false to your connection string.` In order to fix the problem reffer [stackoverflow/58589631](https://stackoverflow.com/questions/58589631/mongoerror-this-mongodb-deployment-does-not-support-retryable-writes-please-ad   "stackoverflow")

