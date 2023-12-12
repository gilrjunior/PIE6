const app = require("express")()
const session = require("express-session");
const arduino = require("./routes/arduino")
const bodyparser = require("body-parser");
require('dotenv').config();

//CONFIG
    //SESSION
    app.use(session({

        secret: "estacao_metereologica",
        resave: true,
        saveUninitialized: true

    }))

//BODYPARSER
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

//ROUTES

    app.use("/arduino", arduino);

//OTHERS

app.listen(process.env.PORT || 8000, () => {

    console.log('Server on'); 

})