import mongoose from 'mongoose'
import config from '../config.js'

 
class Mongo_DB {
    static conexionOk = false

    static async conectarDB() {

        try {
            if (!Mongo_DB.conexionOk) { //no conectar dos veces
                await mongoose.connect(config.STR_CNX, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                })
                console.log('Base de datos conectada!')
                Mongo_DB.conexionOk = true
            }

        }
        catch (error) {
            console.log(`MongoDB error en conectar: ${error.message}`)
        }
    }
}

export default Mongo_DB