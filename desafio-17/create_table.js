// const { CreateTable }=require("./Mensajes/config.js")
// CreateTable()

const { getProducto,insertProducto }=require("./Productos/config")

// getProducto().then(e=>{
//     for (const producto of e) {
//         console.log(producto["nombre"])
//     }
// })
let dato={Title:"inset3",Price:"345",Thumbnail:"dfdfd"}
insertProducto(dato).then(console.log("okey"))
