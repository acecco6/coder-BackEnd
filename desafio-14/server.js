"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var express = require("express");

var fs = require("fs");

var app = express();

var http = require("http").Server(app);

var io = require("socket.io")(http);

var mensaje = [];
var backup = fs.readFileSync('./archivo.txt', 'utf-8');
var backupDatos = JSON.parse(backup);

if (backupDatos.length > 0) {
  var _iterator = _createForOfIteratorHelper(backupDatos),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var it = _step.value;
      mensaje.push(it);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
} // const port=8080


var port = process.env.PORT; // Declaracion de ruta api

var api = express.Router();
app.use("/api", api); // Declaracion de ruta Static

app.use(express["static"]("./public")); // lectura JSON de api

api.use(express.json());
api.use(express.urlencoded({
  extended: true
})); // productos array

var productos = [];
var id_producto = 0; // Setear Views

app.set('views', './views');
app.set('view engine', 'pug'); // Activar Servers
// const server=app.listen(port,()=>{
//     console.log(`Servidor ${server.address().port}`)
// })
// server.on("error",error=>console.log("Error en el Servidor",error))

http.listen(3030, function () {
  console.log("Puerto 3030 Active");
}); // SocketIo Conexion

io.on("connection", function (socket) {
  console.log("Usuario Conectado");
  socket.emit("items", productos);
  socket.emit("returnMSG", mensaje);
  socket.on("item", function (dato) {
    productos.push(dato);
    io.sockets.emit("items", productos);
  });
  socket.on("MSGDatos", function (dato) {
    mensaje.push(dato);
    fs.writeFileSync("./archivo.txt", JSON.stringify(mensaje), 'utf-8');
    io.sockets.emit("returnMSG", mensaje);
  });
}); // Declaracion Rutas

app.get("/productos/vista", function (req, res) {
  if (productos.length == 0) {
    res.render('index.pug', {
      item: "No hay productos",
      active: false
    });
  } else {
    res.render('index.pug', {
      item: productos,
      active: true
    });
  }
});
api.get("/productos", function (req, res) {
  if (productos.length > 0) {
    res.json(productos);
  } else {
    res.json({
      error: "No hay Productos cargados"
    });
  }
});
api.get("/productos/:id", function (req, res) {
  var item = [];

  var _iterator2 = _createForOfIteratorHelper(productos),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var producto = _step2.value;

      if (producto.id == req.params.id) {
        item.push(producto);
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  if (item.length > 0) {
    res.json(item);
  } else {
    res.json({
      error: "Producto no Encontrado"
    });
  }
});
api.post("/productos/guardar", function (req, res) {
  var body = req.body;
  body.id = id_producto + 1;
  id_producto++;
  productos.push(body);
  res.redirect("/");
});
api.put("/productos/actualizar/:id", function (req, res) {
  var id = req.params.id;
  var item = req.body;

  var _iterator3 = _createForOfIteratorHelper(productos),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var producto = _step3.value;

      if (id == producto.id) {
        producto.Title = item.Title;
        producto.Price = item.Price;
        producto.Thumbnail = item.Thumbnail;
      }
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  res.json(item);
});
api["delete"]("/productos/borrar/:id", function (req, res) {
  var id = req.params.id;
  var item = productos.find(function (items) {
    return items.id == id;
  });
  var items = productos.filter(function (e) {
    return e.id != id;
  });
  productos = items;
  res.json(item);
});