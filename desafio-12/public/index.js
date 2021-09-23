const socket=io()


function enviar(){
    let Title=document.getElementsByTagName("input")[0]
    let Price=document.getElementsByTagName("input")[1]
    let Thumbnail=document.getElementsByTagName("input")[2]
    let item={"Title":Title.value,"Price":Price.value,"Thumbnail":Thumbnail.value}
    socket.emit("item",item)
    Title.value=""
    Price.value=""
    Thumbnail.value=""
    return false
}
socket.on("items",(data)=>{
    render(data)
})



function render(dato) {
    var html=dato.map((element)=>{
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

