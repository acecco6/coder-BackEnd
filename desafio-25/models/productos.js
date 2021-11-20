class Producto {
    constructor(id, nombre, timestamp,  descripcion, codigo, url, precio, stock){
        this.id = id,
        this.nombre = nombre,
        this.timestamp = Date.now(),
        this.descripcion = descripcion,
        this.codigo = codigo,
        this.url = url,
        this.precio = precio,
        this.stock = stock

    }
}

export {Producto} 