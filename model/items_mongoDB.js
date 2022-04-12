import mongoose from 'mongoose'
import Mongo_DB from './DB_mongo.js'

const itemSchema = mongoose.Schema({ //declaro schema de docu
    nombre: String,
    precio: Number,
})

//modelo de docu almacenado en coleccion
const ItemsModel = mongoose.model("items", itemSchema)


class ItemModelMongoDB { //CRUD

    /* CRUD -> R (Read ALL) */
    async readProductos() {
        if (!Mongo_DB.conexionOk) return []
        try {
            let productos = await ItemsModel.find({}).lean()
            console.log(productos)
            //return Mongo_DB.genIdKey(productos) //devuelve sin _ , normalizado, para  ser utilizado por frontend
            return productos
        }
        catch (error) {
            console.log(`Error en readProductos: ${error.message}`)
            return []
        }
    }

}


export default ItemsModel 
