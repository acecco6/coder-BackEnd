const fs=require("fs")

class Archivo{
    constructor(nombre) {
        this.nombre = nombre;
    }
    async leer() {
        try {
            const data=await fs.promises.readFile('./'+this.nombre,'utf-8')
            console.log(JSON.parse(data))
        } catch (error) {
            console.log([])
        }
    }

    async guardar() {
        try {
            const data=await fs.promises.readFile('./'+this.nombre,'utf-8')
        let items=JSON.parse(data)
        let i=1
        for (const item of items) {
            item.id=i
            i++
        }
        items=JSON.stringify(items)
        fs.writeFileSync("./"+this.nombre,items)  
        } catch (e) {
            console.log("error al guardar id")
        }
        
    }

    borrar() {
        try {
            fs.unlinkSync('./'+this.nombre,)
            console.log("Archivo Borrado")
        } catch (e) {
            console.log("No se pudo Borrar el Archivo"+e)
        }   
    }
      
}

const prueba=new Archivo("producto.txt")

prueba.leer()
// prueba.guardar()
// prueba.borrar()

