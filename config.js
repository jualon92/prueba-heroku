import dotenv from  "dotenv/config"

// no necesario si se exporta dotenv/config 
//dotenv.config() 
console.log("process.env.PORT" , process.env.PORT)  
console.log("process.env.CNX" , process.env.CNX)


export default { // export estas variables 
    PORT : process.env.PORT || 8080, 
    STR_CNX: process.env.CNX 
}