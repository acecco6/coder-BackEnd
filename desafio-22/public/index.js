const socket = io();

socket.on('productCatalog', (productsData) => renderProducts(productsData));
let renderProducts = (productsData) => {
    console.log('CLIENT: ', productsData.products);
    if (productsData.products.length > 0) {
        let htmlProductos = productsData.products.map(e => `
        <div class="row product">
            <div class="col-2">${e.title}</div>
            <div class="col-2">$ ${e.price}</div>
            <div class="col-2">
                <img src="${e.thumbnail}" alt="" width="60" height="60">
            </div>
            <div class="col-2">
                <a href="/productos/editar/${e._id}"><button class="btn btn-primary">Editar</button></a>
                </div>
            <div class="col-2">
            <form class="delete-product" action="/productos/borrar/${e._id}?_method=DELETE"
                method="POST">
                <button class="btn btn-danger"onclick="return confirm('Seguro querés borrar este producto?');">Eliminar</button>
            </form>
         </div>
        </div>`
        ).join(' ');
        document.getElementById('viewTitle').innerHTML = productsData.viewTitle;
        document.getElementById('productCatalog').innerHTML = htmlProductos;
    } else {
        let html = `<div class="error" style="padding:2em;text-align:center">${data.errorMessage}</div>`;
        document.getElementById('productCatalog').innerHTML = html;
    }
}

socket.on('messages', (messagesData) => renderMessages(messagesData));
let renderMessages = (messagesData) => {
    //Mensajes
    let htmlMensajes = messagesData.messages.map((e, i) => `
             <div class="row">
                 <strong style="color: blue; font-size: 20px">${e.email} <em style="color: black; font-size: 12px">${e.date}</em></strong>
                 <em style="color: black; font-size: 20px; padding:0.5em">- ${e.msg}</em>
              </div>`
    ).join(' ');
    document.getElementById('messages').innerHTML = htmlMensajes;
}

function sendMsg(form) {
    let fullMsg = {
        email: document.getElementById('email').value,
        date: Date.now(),
        msg: document.getElementById('msg').value
    }
    socket.emit('newMsg', fullMsg);
    console.log('Client: ', fullMsg);
    return false;
}

