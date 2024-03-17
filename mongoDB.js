
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://arya1234:Arya12345mongO@my-mern-social.7sec6nu.mongodb.net/?retryWrites=true&w=majority&appName=my-mern-social")
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