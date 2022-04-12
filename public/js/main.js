
console.warn("hola!")
 
const itemsDB = async () => await fetch("/items/").then(r => r.json()).then(console.log)
 
 