const mongoose = require('mongoose');

const UserScheme = new mongoose.Schema({
  fecha: String,
  propiedad: String,
  tipoGasto: String,
  valorGasto: Number,
  descripcion: String,
  idGasto: String
})

const gasto = mongoose.model('gasto', UserScheme)

module.exports = gasto