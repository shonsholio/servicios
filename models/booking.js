const mongoose = require('mongoose');

const UserScheme = new mongoose.Schema({
  propiedad: String,
  nombreHuesped: String,
  pax: Number,
  numDocumento: String,
  checkIn: String,
  checkOut: String,
  telefono: Number,
  channel: String,
  totalReserva: Number,
  idBooking: String
})

const booking = mongoose.model('booking', UserScheme)

module.exports = booking