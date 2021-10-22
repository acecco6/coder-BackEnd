const socket=io()


function enviar(){
    let Title=document.getElementsByTagName("input")[0]
    let Price=document.getElementsByTagName("input")[1]
    let Thumbnail=document.getElementsByTagName("input")[2]
    if (Title.value.length >0 && Price.value.length >0 && Thumbnail.value.length >0 ) {
        let item={Title:Title.value,Price:Price.value,Thumbnail:Thumbnail.value}
        socket.emit("item",item)
        Title.value=""
        Price.value=""
        Thumbnail.value=""
        return false
    }
    return false
}
socket.on("items",(data)=>{
    renderTable(data)
})

function enviarMSG(e){
    let mail=document.getElementById("mailMsg")
    let nombre=document.getElementById("nombreMsg")
    let text=document.getElementById("textMsg")
    if (mail.value.length >0 && nombre.value.length>0 && text.value.length>0) {
        let idUsuario=socket.id
        let date = new Date()
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        let dia=`${day}/${month}/${year}`
        let hora=date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
        
        
        socket.emit("MSGDatos",{mail:mail.value,nombre:nombre.value,text:text.value,date:dia,hora:hora,idUsuario:idUsuario})
        text.value=""
        return false
    }
    return false
}

socket.on("returnMSG",(data)=>{
    renderMSG(data)
})

function renderMSG(dato) {
    let id=socket.id
    let html=dato.map((element,index)=>{
        if (id==element.idUsuario) {
            return(`
                <div class="d-flex justify-content-end mb-4">
                    <div class="msg_cotainer_send">
                        ${element.text}
                        <span class="badge-dark msg_time_send">${element.nombre} </span>
                        <span class="date_r">${element.date} / ${element.hora} </span>
                    </div>
                    <div class="img_cont_msg">
                        <img src="https://cdn3.iconfinder.com/data/icons/user-2/100/9-128.png" class="rounded-circle user_img_msg">
                    </div>
                </div>
                
            `)
        }else{
            return(`                   
                <div class="d-flex justify-content-start mb-4">
                    <div class="img_cont_msg">
                        <img src="https://cdn0.iconfinder.com/data/icons/users-34/24/user_symbol_person_2-128.png" class="rounded-circle user_img_msg">
                    </div>
                    <div class="msg_cotainer">
                        ${element.text}
                        <span class="badge-dark msg_time_send">${element.nombre} </span>
                        <span class="date_d">${element.date} / ${element.hora}) </span>
                    </div>
                </div>
            `)
        }
    }).join(" ")

    document.getElementById("MSGContent").innerHTML=html
    botom()
}
function enter() {
    if(event.code == "Enter"){
        enviarMSG()
    }
}

// Scroll automatico hacia abajo
function botom() {
    let botom=document.getElementById("MSGContent")
    botom.scrollTop = botom.scrollHeight;
}

function renderTable(dato) {
    let html=dato.map((element)=>{
        return(`
            <tr>
                <td>${element.Title}</td>
                <td>${element.Price}</td>
                <td><img height="50px" width="50px" style="object-fit: cover;" src=${element.Thumbnail} /></td>
            </tr>
        `)
    }).join(" ")
    document.getElementById("it").innerHTML=html
}

