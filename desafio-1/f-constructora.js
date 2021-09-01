
function Usuario(nombre,apellido) {
    this.nombre=nombre
    this.apellido=apellido
    this.libros=[]
    this.mascotas=[]
    
    Usuario.prototype.getFullName=function(){
        return (`${this.nombre} ${this.apellido}`)
    }
    Usuario.prototype.addMascota=function(mascota){
        this.mascotas.push(mascota)
    }
    Usuario.prototype.getMascota=function(){
        return(this.mascotas.length)
    }

    Usuario.prototype.addBook=function(book,autor){
        this.libros.push({nombre:book,autor:autor})
    }
    Usuario.prototype.getBook=function(){
        var nombresLibros=[]
        for (const nombre of this.libros) {
            nombresLibros.push(nombre.nombre)
        }
        return(nombresLibros)
    }
}




