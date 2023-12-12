const mongoose = require("./connection")

const statusModel = new mongoose.Schema({

    status: {

        type: Boolean

    },
    type: {
        type:String
    }

})

//SET MODEL
statusDB = mongoose.model("status", statusModel)

//EXPORTS
module.exports = statusDB