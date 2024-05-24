const mongoose = require('mongoose');

const UserScheme = new mongoose.Schema({
  propiedad: String,
  fechaLecturaActual: String,
  lecturaActual: Number,
  fechaLecturaAnterior: String,
  lecturaAnterior: Number,
  valorFactura: Number,
  diasFacturados: Number,
  consumo: Number,
  consumoDia: Number,
  valorKw: Number,
  valorFacturaDia: Number,
  idBills: Number

})

const aire = mongoose.model('aire', UserScheme)

module.exports = aire