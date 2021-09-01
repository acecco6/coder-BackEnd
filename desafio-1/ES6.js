
class Usuario{
    constructor(nombre,apellido){
        this.nombre=nombre
        this.apellido=apellido
        this.libros=[]
        this.mascotas=[]
    }
    
    
    getFullName(){
        return (`${this.nombre} ${this.apellido}`)
    }
    addMascota(mascota){
        this.mascotas.push(mascota)
    }
    getMascota(){
        return(this.mascotas.length)
    }

    addBook(book,autor){
        this.libros.push({nombre:book,autor:autor})
    }
    getBook(){
        var nombresLibros=[]
        for (const nombre of this.libros) {
            nombresLibros.push(nombre.nombre)
        }
        return(nombresLibros)
    }
}
