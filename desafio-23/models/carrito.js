
class Carrito {
    constructor(id, timestamp, producto){
        this.id= id,
        this.timestamp = Date.now(),
        this.productos = []

    }
}

export {Carrito}