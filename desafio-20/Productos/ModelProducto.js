const mongoose = require('mongoose');
const {Productos} =require("../models/productos")

async function getProductos(id){
  try {
    const URI = 'mongodb://localhost:27017/ecomerce';
    await mongoose.connect(URI, 
      { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 1000
      })    
    console.log('Conectado a la base de datos...');
    if (id==undefined) {
      let producto = await Productos.find();
      await mongoose.connection.close();
      return(producto)
    }else{
      let producto = await Productos.find({_id:id});
      await mongoose.connection.close();
      return(producto)
    }
    
  }
  catch(error) {
    throw `Error: ${error}`;
  }
}

async function insertProductos(Title,Price,foto){
  try {
    const URI = 'mongodb://localhost:27017/ecomerce';
    await mongoose.connect(URI, 
      { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 1000
      })    
    console.log('Conectado a la base de datos...');
    await Productos.create({Title:Title,Price:Price,foto:foto})
    
  }
  catch(error) {
    throw `Error: ${error}`;
  }
}
  async function setProductos(id,Title,Price,foto){
    try {
      const URI = 'mongodb://localhost:27017/ecomerce';
      await mongoose.connect(URI, 
        { 
          useNewUrlParser: true,
          useUnifiedTopology: true,
          serverSelectionTimeoutMS: 1000
        })    
      console.log('Conectado a la base de datos...');
      await Productos.updateOne({_id:id},{Title:Title,Price:Price,foto:foto});
      await mongoose.connection.close();
    }
    catch(error) {
      throw `Error: ${error}`;
    }
  }
  async function deleteProductos(id){
    try {
      const URI = 'mongodb://localhost:27017/ecomerce';
      await mongoose.connect(URI, 
        { 
          useNewUrlParser: true,
          useUnifiedTopology: true,
          serverSelectionTimeoutMS: 1000
        })    
      console.log('Conectado a la base de datos...');
      await Productos.deleteOne({_id:id});
      await mongoose.connection.close();
    }
    catch(error) {
      throw `Error: ${error}`;
    }
  }

  
module.exports = {
  getProductos,
  insertProductos,
  deleteProductos,
  setProductos
}
