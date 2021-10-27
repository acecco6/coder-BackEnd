let Connect=require("../Config/config")
 
let ProductosBD = new Connect()
ProductosBD=ProductosBD.Mysql()
console.log(ProductosBD)
ProductosBD=require("knex")(ProductosBD)
console.log(ProductosBD)
