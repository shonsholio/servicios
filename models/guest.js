const mongoose = require('mongoose');

const UserScheme = new mongoose.Schema({
  nombres: String,
  apellidos: String,
  tipoDocumento: String,
  numDocumento: String,
  fechaNacimiento: String,
  paisNacimiento: String,
  telefono: Number,
  email: String,
  idGuest: String
})

const guest = mongoose.model('guest', UserScheme)

module.exports = guest