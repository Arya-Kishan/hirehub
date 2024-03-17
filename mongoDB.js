
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("CONNECTED TO CLOUD MONGO DB");
    })
    .catch((err) => {
        console.log("ERROR IN CONNECTING MONGO DB");
        console.log(err);
    })






// const mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost:27017/arya-social-media')
//     .then(() => {
//         console.log("CONNECTED TO MONGO DB");
//     })
//     .catch((err) => {
//         console.log("ERROR IN CONNECTING MONGO DB");
//         console.log(err);
//     })