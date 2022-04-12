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


const PORT = config.PORT

mercadopago.configure({
    access_token: "APP_USR-415255069673949-013103-53933e062c46695b33189542f57470bc-92731233",
});



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

Mongo_DB.conectarDB() //conexion base de datos + feedback

const app = express()

app.use(cors())
app.use(compression());
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/items", routerItem)


const fetchItems = async () => { //preguntar a mongo los pares nombre precio para 
    listaDB = await fetch(`http://localhost:9000/items`).then(r => r.json())
}



app.post("/create_preference", async (req, res) => {

    listaDB = await fetchItems()


    if (true) {
        console.log(arrLocales)
        let preference = {
            items: arrLocales,
            back_urls: {
                "success": "http://localhost:9000/feedback",
                "failure": "http://localhost:9000/feedback",
                "pending": "http://localhost:9000/feedback"
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

    } else {
        console.log("existe un item que no concuerda con la DB")
    }

});

app.get('/feedback', function (req, res) {
    let info = {
        Payment: req.query.payment_id,
        Status: req.query.status,
        MerchantOrder: req.query.merchant_order_id
    };
    console.log(info)
    res.redirect("/#carrito")
});



// config 
const server = app.listen(PORT, () => console.log(`Servidor express escuchando en el puerto ${PORT}`))
server.on('error', error => console.log(`Error en servidor express: ${error.message}`))


