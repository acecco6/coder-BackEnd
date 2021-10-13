const {ProductosBD} = require("../Config/ConnectDB.js")


function getProducto() {
    return new Promise((resolve,reject)=>{
        ProductosBD.select("id","nombre","precio","foto").from('item')
        .then(productos=>{
            ProductosBD.destroy()
            resolve(productos)
        })
        .catch(()=>{
            ProductosBD.destroy()
        })
    })
}

function insertProducto(dato) {
        ProductosBD('item').insert({nombre:dato.Title,precio:dato.Price,foto:dato.Thumbnail})
        .then (()=>{
            console.log('Filas insertadas!');
            ProductosBD.destroy();
            resolve("okey")
        })     
}
function setProducto(dato) {
    return new Promise((resolve,reject)=>{
        ProductosBD('item').insert({nombre:dato.Title,precio:dato.Price,foto:dato.Thumbnail})
        .then (()=>{
            ProductosBD.destroy();
            resolve("Producto Insertado")
        })
    })
    
}

function deleteProducto() {
    
}


module.exports={
    getProducto,
    setProducto,
    deleteProducto,
    insertProducto
}
