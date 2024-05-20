const mongoose = require('mongoose');

const UserScheme = new mongoose.Schema({
  propiedad: String,
  fechaLectura: String,
  lectura: Number,
  valorFactura: Number
})

const aire = mongoose.model('aire', UserScheme)

module.exports = aire