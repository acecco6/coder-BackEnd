const path = require('path');

const DB=path.join(__dirname,"msg.sqlite")
const MensajesBD ={
  client: 'sqlite3',
  connection:{
    filename:DB
  },
  useNullAsDefault: true,
}

console.log('Conectando a la base de datos...');

module.exports={
  MensajesBD
}

