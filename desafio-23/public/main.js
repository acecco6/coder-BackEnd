const socket = io ()
import util from 'util'
import {normalize, denormalize, schema} from 'normalizr'

socket.on('messages', (data)=>{
    render(data)
})
const render = (data) => {
    const html =  data.map((m)=>`
        <div class="fila">
            <strong style="color:blue">Id: ${m.id}</strong><br>
            <strong style="color:blue">E-mail: ${m.mail}</strong><br>
            <strong style="color:black">nombre: ${m.nombre}</strong><br>
            <strong style="color:black">edad: ${m.edad}</strong><br>
            <strong style="color:black">alias: ${m.alias}</strong><br>
            <em style="color:green">text: ${m.text}</em>
        </div>
    `).join(' ');
    document.getElementById('messages').innerHTML = html
    }
   
const envioMensaje = (f) => {
        let id = document.getElementById('id').value
        let mail = document.getElementById('mail').value
        let nombre = document.getElementById('nombre').value
        let edad = document.getElementById('edad').value
        let alias = document.getElementById('alias').value
        let text = document.getElementById('mensaje').value
        socket.emit('nuevo', {id, mail, nombre, edad, alias, text})
        return false
    }

    const authorSchema = new schema.Entity('author')
    const messageSchema = new schema.Entity('mensajes', { author: [authorSchema]},)

    const normalizedHolding = normalize(messages, messageSchema)
    print(normalizedHolding)
    const longAntes = JSON.stringify(messages).length
    const longDespues = JSON.stringify(normalizedHolding).length
    console.log('Longitud antes de normalizar:', longAntes)
    console.log('Longitud después de normalizar:', longDespues)