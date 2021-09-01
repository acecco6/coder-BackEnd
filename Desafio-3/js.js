
// Ejercicio 1
// function RecorrerPalabras(texto,callback,tiempo) {
//     let index=0
//     let id=setInterval(
//         ()=>{
//             console.log(texto[index++])
//             if (index==texto.length) {
//                 clearInterval(id)
//                 callback()
//             }
//         },tiempo
//     )
// }

// function fin() {
//     console.log("Proceso Completado")
// }
// RecorrerPalabras("Palabra",fin,1000)




// Ejercicio 2
var i=0
function RecorrerPalabras(texto,tiempo,callback) {
    let palabra=texto.split(" ")
    i=i+palabra.length
    if(tiempo==undefined){
        tiempo=1000
    }
    let index=0
    let id=setInterval(
        ()=>{
            console.log(palabra[index++])
            if (index==palabra.length) {
                clearInterval(id)
                callback()
            }
        },tiempo
    )
}

RecorrerPalabras("Palabra-1 prueba",1000,
    ()=>RecorrerPalabras("Palabra-2 prueba2",300,
        ()=>RecorrerPalabras("Palabra-3 prueba3",2000,fin))
)

function fin() {
    console.log("Proceso Completado,\nCantidad de palabras= "+i)
}