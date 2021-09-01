import express from 'express'
import fs from 'fs'

const app=express()
const PORT=8080
var vistas_item=0
var vistas_items=0
const data = fs.readFileSync('./archivo.txt','utf-8');
const objeto=JSON.parse(data)

const server=app.listen(PORT,()=>{
    console.log("Servidor", server.address().port)
})
server.on('error',error=>(console.log("Error en Servidor", error)))
app.get("/items",(req,res)=>{
    vistas_items++
    let items=[]
    let cantidad=0
    for (const obj of objeto) {
        items.push(obj.Title)
        cantidad++
    }
    let item=[{"items":items,"cantidad":cantidad}]
    res.json(item)
})

app.get("/items-random",(req,res)=>{
    vistas_item++
    let item=[{"item":objeto[Math.floor(Math.random()*(3-0)+0)].Title}]
    res.json(item)
})
app.get("/visitas",(req,res)=>{
    let visitas=[{"visitas":{"items":vistas_items},"item":vistas_item}]
    res.json(visitas)
})

