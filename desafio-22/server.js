const express = require("express");
const handlebars = require("express-handlebars");
const methodOverride = require('method-override');
const mongoose = require("mongoose");

const Message = require("./db/Message");
const Product = require("./db//Product");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const routerAPI = express.Router();
const PORT = 8080; //

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static("./public"));
app.use("/api", routerAPI);
server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
server.on("error", (error) => console.log("Server Error\n\t", error));

// handlebars engine
app.engine("hbs", handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views",
    partialsDir: __dirname + "/views/partials"
}));
app.set("views", "./views");
app.set("view engine", "hbs");
app.get('/', (_, res) => res.redirect('/productos'));

//Mongoose
connect()

function connect() {
    const URI = 'mongodb://localhost:27017/ecommerce-test';
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 1000
    })
        .then(() => console.log('Conectado a la base de datos...'))

        // PARA INSERTAR PRODUCTOS MOCK POR PRIMERA VEZ
        // .then(() => Product.insertMany([{
        //     title: "Producto 1",
        //     price: 100,
        //     thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/bus-vehicle-transport-school-128.png"
        // },
        // {
        //     title: "Producto 2",
        //     price: 550,
        //     thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-128.png"
        // },
        // {
        //     title: "Producto 3",
        //     price: 890,
        //     thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/plane-paper-toy-science-school-128.png"
        // },
        // {
        //     title: "Producto 4",
        //     price: 1020,
        //     thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/bus-vehicle-transport-school-128.png"
        // },
        // {
        //     title: "Producto 5",
        //     price: 1300,
        //     thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-128.png"
        // }]))

        .catch(error => console.log('Error al conectarse a la base de datos', error));
}

// Ruta base para uso de HANDLEBARS
app.get('/productos', (req, res) => {
    Product.find().sort({ '_id': 1 })
        .then(products => {
            if (products.length) {
                //, { ok: true, updateForm: false, error: null, products: products }
                res.render('index')
            } else {
                res.render('index', { ok: false, error: 'No hay products cargados', productos: [] })
            }
        })
        .catch(e => {
            console.log('Error getting products: ', e);
        })
});

app.post('/productos/agregar', (req, res) => {
    Product.create(req.body)
        .then(() => {
            console.log('producto insertado');
            res.redirect('/productos')
        })
        .catch(e => {
            console.log('Error en Insert producto: ', e);
        });
});

app.get("/productos/editar/:id", (req, res) => {

    let currentID = req.params.id;

    Product.findById(currentID)
        .then(prod => {
            console.log(prod);
            res.render('index', {
                id: prod._id,
                title: prod.title,
                thumbnail: prod.thumbnail,
                price: prod.price,
                updateForm: true,
                viewTitle: "Editar producto",
                errorMessage: "No hay productos."
            })
        })
        .catch(e => {
            console.log('Error getting products: ', e);
        });
});

app.put('/productos/editar/:_id', (req, res) => {
    let id = req.params._id;
    console.log(req.body);

    Product.findByIdAndUpdate(id, req.body)
        .then(prod => {
            console.log('producto actualizado: ', prod);
            res.redirect('/productos');
        })
        .catch(e => {
            console.log('Error en Update producto: ', e);
        });
});

app.delete('/productos/borrar/:idprod', (req, res) => {
    let id = req.params.idprod;
    Product.findByIdAndDelete(id)
        .then(prod => {
            console.log('producto eliminado: ', prod);
            res.redirect('/productos');
        })
        .catch(e => {
            console.log('Error en Delete producto: ', e);
        });
});

io.on('connection', (socket) => {
    console.log('Someone is connected');

    //funcion para leer todos los mensajes de la db y mostrarlos.
    function selectAllMessages() {
        Message.find().sort({ 'date': -1 })
            .then(messages => {
                socket.emit('messages', { messages: messages });
            })
            .catch(e => {
                console.log('Error getting messages: ', e);
            });
    }

    //Llamo a la funcion para que se muestren los mensajes al levantar el servidor.
    selectAllMessages();

    Product.find().sort({ '_id': 1 })
        .then(products => {
            socket.emit('productCatalog', { products: products, updateForm: false, viewTitle: "Listado de productos", errorMessage: "No hay productos." });
        })
        .catch(e => {
            console.log('Error getting products: ', e);
        });

    //Inserto un nuevo mensaje en la base de datos de mensajes.
    socket.on('newMsg', newMsg => {
        Message.create(newMsg)
            .then(() => {
                console.log('Mensaje insertado');
                selectAllMessages();
                return false;
            })
            .catch(e => {
                console.log('Error en Insert message: ', e);
            });
    });
});