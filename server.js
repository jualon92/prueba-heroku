import express from 'express'
import cors from "cors"
import compression from "compression"
import config from "./config.js"
import Mongo_DB from "./model/DB_mongo.js"
import routerItem from "./router/api/item.js"
import mercadopago from "mercadopago"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import fetch from "node-fetch"



mercadopago.configure({
    access_token: "APP_USR-415255069673949-013103-53933e062c46695b33189542f57470bc-92731233",
});

 

Mongo_DB.conectarDB() //conexion base de datos + feedback

const app = express()

app.use(cors())
app.use(compression());
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

 



app.post("/create_preference",   (req, res) => {

 
        // if (JSON.stringify(listaItems) == JSON.stringify(arrAtributos)) {  //verificar
        let preference = {
            items:  [
                {
                    title: req.body.description,
                    unit_price: Number(req.body.price),
                    quantity: Number(req.body.quantity),
                }
            ],
            back_urls: {
                "success": "http://localhost:8080/feedback",
                "failure": "http://localhost:8080/feedback",
                "pending": "http://localhost:8080/feedback"
            },
            auto_return: "approved",
        };

        mercadopago.preferences.create(preference)
            .then(function (response) {
                res.json({
                    id: response.body.id
                });
            }).catch(function (error) {
                console.log(error);
            });
        /* } else{
             console.warn("precio con ese nombre no existe en DB")
         */
        //   }
     
});


// config
const PORT = config.PORT  // config toma de package.json
const server = app.listen(PORT, () => console.log(`Servidor express escuchando en el puerto ${PORT}`))
server.on('error', error => console.log(`Error en servidor express: ${error.message}`))




