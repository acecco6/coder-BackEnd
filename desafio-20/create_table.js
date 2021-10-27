const {MensajesBD}=require("./DB/ConnectMSG")
const knex=require("knex")(MensajesBD)

knex.schema.createTable('mensaje',(table)=>{
    table.increments('id'),
    table.string('idUsuario'),
    table.string('nombre'),
    table.string('mail'),
    table.string('text')
    table.string('date')
    table.string('hora')
})
.then(()=>{
    console.log("tabla Creada")
    knex.destroy()
})
.catch((e)=>{
    console.log("error "+ e)
})

