const socket = io ()
socket.on('messages', (data)=>{
    render(data)
})
const render = (data) => {
    const html =  data.map((m)=>`
        <div class="fila">
            <strong style="color:blue">${m.mail}</strong>
            <em style="color:green">${m.text}</em>
        </div>
    `).join(' ');
    document.getElementById('messages').innerHTML = html
    }
   
const envioMensaje = (f) => {
        let mail = document.getElementById('mail').value
        let text = document.getElementById('mensaje').value
        socket.emit('nuevo', {mail, text})
        return false
    }