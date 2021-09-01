var http=require('http');
var server=http.createServer(function(peticion,respuesta){
    var hora=new Date().getHours()
    if (hora>=6 && hora  <= 12) {
        respuesta.end("buenos dias")
    }
    if (hora>=11 && hora  <= 19) {
        respuesta.end("buenos Tardes")
    }
    if (hora>=20 && hora  <= 5) {
        respuesta.end("buenos Noches")
    }

    
})
server.listen(8081,function(){
    console.log("tu servidor esta listo en ", this.address().port);
})