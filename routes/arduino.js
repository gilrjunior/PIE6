const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const cors = require('cors');
const axios = require("axios");
const systemDB = require("../db/model")
const statusDB = require("../db/model2");
const regandoDB = require("../db/modelRegando");
const regavelDB = require("../db/modelRegavel");
dotenv.config()

router.use((req, res, next) => {
    //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
    //Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    router.use(cors());
    next();
});

router.post("/post", async (req, res) => {

    console.log(req.body)

    var temp = 0;
    var humidity = 0;
    var ground_humidity = req.body.value;
    var sky = "";

    await axios.get(process.env.APIURL)
        .then(function (response) {
            humidity = response.data.main.humidity;
            temp = response.data.main.temp;
            sky = response.data.weather[0].description;
        })

    const newData = {

        humidity: humidity,
        temp: temp,
        ground_humidity: ground_humidity,
        sky: sky

    }

    console.log(newData)

    new systemDB(newData).save().then(() =>

        console.log("Registrado no banco com sucesso!")

    ).catch((err) => {

        console.log(err);

    })

    // regavelDB.findOneAndUpdate({ _id: "" }, {

    //     isRegavel: req.body.isRegavel,
    //     type: req.body.type

    // }).then(() => {

    //     console.log("Status que é regável atualizado");
    //     console.log(req.body.isRegavel)
    //     res.sendStatus(204);

    // }).catch((err) => {

    //     console.log(err)

    // })

    res.sendStatus(204);


})

router.get("/get", async (req, res) => {

    await systemDB.findOne().sort({ _id: -1 }).then((data) => {

        res.send([data])

    }).catch((err) => {

        console.log(err);

    })

})

router.post("/status", (req, res) => {

    statusDB.findOneAndUpdate({ _id: "65561527999bd34ea7edb7a7" }, {

        status: req.body.status,
        type: req.body.type

    }).then(() => {

        console.log("Status atualizado");
        console.log(req.body.status)
        res.sendStatus(204);

    }).catch((err) => {

        console.log(err)

    })

})

router.get("/status", (req, res) => {

    statusDB.findOne().then((status) => {

        res.status(200).send([status]);


    }).catch((err) => {

        console.log(err)

    })

})

//Regável
//post
router.post("/regavel", (req, res) => {

    regavelDB.findOneAndUpdate({ _id: "6566ac7f41da45f5b84dfd44" }, {

        isRegavel: req.body.isRegavel,
        type: req.body.type

    }).then(() => {

        console.log("Status que é regável atualizado");
        console.log(req.body.isRegavel)
        res.sendStatus(204);

    }).catch((err) => {

        console.log(err)

    })

})

//get
router.get("/regavel", async (req, res) => {

    await regavelDB.findOne().then((status) => {

        res.status(200).send([status]);
        console.log("Tá regável")
        console.log(status)


    }).catch((err) => {

        console.log(err)

    })

})

//Regando
//post
router.post("/regando", (req, res) => {

    regandoDB.findOneAndUpdate({ _id: "6566acf241da45f5b84dfd45" }, {

        isRegando: req.body.isRegando,
        type: req.body.type

    }).then(() => {

        console.log("Status que está regando atualizado");
        console.log(req.body.isRegando)
        res.sendStatus(204);

    }).catch((err) => {

        console.log(err)

    })

})

//get
router.get("/regando", (req, res) => {

    regandoDB.findOne().then((status) => {

        res.status(200).send([status]);

    }).catch((err) => {

        console.log(err)

    })

})


module.exports = router;

