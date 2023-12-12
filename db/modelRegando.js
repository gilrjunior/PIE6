const mongoose = require("./connection")

const regandoModel = new mongoose.Schema({

    isRegando: {

        type: Boolean

    },
    type: {
        type:String
    }

})

//SET MODEL
regandoDB = mongoose.model("isRegando", regandoModel)

//EXPORTS
module.exports = regandoDB