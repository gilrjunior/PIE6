const mongoose = require("mongoose");
require('dotenv').config();


//DATABASE CONNECTION SETUP
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO, {

    useNewUrlParser: true

}).then(() => {

    console.log("Connected to the database");

}).catch((err) => {

    console.log("Error "+err);

})


//EXPORTS
module.exports = mongoose;