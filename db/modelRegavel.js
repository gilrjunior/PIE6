const mongoose = require("./connection")

const regavelModel = new mongoose.Schema({

    isRegavel: {

        type: Boolean

    },
    type: {
        type:String
    }

})

//SET MODEL
regavelDB = mongoose.model("isRegavel", regavelModel)

//EXPORTS
module.exports = regavelDB