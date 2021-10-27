const mongoose = require('mongoose');

const Esquema = new mongoose.Schema({
    Title:{type: String, require:true},
    Price:{type: Number, require:true},
    foto:{type: String, require:true}
})

module.exports = {
    Productos:mongoose.model("productos",Esquema)
}