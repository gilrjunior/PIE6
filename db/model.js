const mongoose = require("./connection")

const systemModel = new mongoose.Schema({

    humidity: {

        type: Number

    },
    temp: {

        type: Number

    },
    ground_humidity: {

        type: Number

    },
    sky: {

        type: String

    }

})

//SET MODEL
system = mongoose.model("systemdata", systemModel)

//EXPORTS
module.exports = system