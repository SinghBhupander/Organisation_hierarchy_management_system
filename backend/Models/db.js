const mongoose = require('mongoose');

const MONGO_URL= process.env.MONGO_URL;
mongoose.connect(MONGO_URL).then(() => {
    console.log('MongoDb COnnected Successfully');
}).catch((err) => {
    console.log(`error in connection : ${err}`);
})