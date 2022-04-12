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


//let listaDB  //deberia ser por import
const fetchItems = async () => { //preguntar a mongo los pares nombre precio para 
    listaDB = await fetch('http://localhost:9000/items').then(r => r.json())

}

 


app.post("/create_preference", async (req, res) => {

    let p = await fetchItems()
    
    /*

    //  let itemInput = {name: req.body.description, price : req.body.price}
    //  let listaItems = listaDB[0]
    //  let itemBack = {name: listaItems.name, price: listaItems.price}
    //  console.log(listaItems)
    //   console.log(itemInput,itemBack)
    //   console.log(JSON.stringify(itemInput) == JSON.stringify(itemBack))


    //verificacion integridad
    let arrReq = Array.from(req.body)

    let listaMongo = listaDB


    let arrLocales = []
    let arrDB = []
    for (let i = 0; i < arrReq.length; i++) { // setea preferencia de cada item
        let producto = {
            title: req.body[i].description,
            unit_price: Number(req.body[i].price),
            quantity: Number(req.body[i].quantity),
        }
        arrLocales.push(producto)
    }


    let arrLocalComparable = arrLocales.map(prod => JSON.stringify(({ title: prod.title, unit_price: prod.unit_price })))
    let arrDBComparable = listaDB.map(prod => JSON.stringify(({ title: prod.name, unit_price: prod.price })))


    //verificacion



    console.log("lista local: ", arrLocalComparable)
    console.log("lista db ", arrDBComparable)

    let listaCoincidencias = []

    function verificar() {

        arrLocalComparable.forEach(localSTR => { //por cada item en la lista
            let estaEnDB = arrDBComparable.includes(localSTR)
            listaCoincidencias.push(estaEnDB)
        });
    }


    const coincidenTodasEnDB = () => listaCoincidencias.every(ele => ele == true)
    

    verificar()
    console.log(listaCoincidencias) */
    if (true) {
        // if (JSON.stringify(listaItems) == JSON.stringify(arrAtributos)) {  //verificar
        let preference = {
            items: arrLocales,
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
    } else {
        console.log("existe un item que no concuerda con la DB")
    }
});


// config
const PORT = config.PORT  // config toma de package.json
const server = app.listen(PORT, () => console.log(`Servidor express escuchando en el puerto ${PORT}`))
server.on('error', error => console.log(`Error en servidor express: ${error.message}`))




