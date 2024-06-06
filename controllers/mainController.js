const controller = {};
const aire = require('../models/air-e')
const guest = require('../models/guest')
const booking = require('../models/booking')

controller.main = (req,res) => {
  res.render('main')
}

controller.register = (req,res) => {
  res.render('registro')
}

controller.showBills = (req,res) => {

  const filtrado = Object.keys(req.query)

  aire.find( { propiedad : filtrado[0] } ).sort( { fechaLecturaActual : -1 } )
  .then(factura => {

    res.render('bills', {
      bills: factura
    })

  })

}

controller.newbill = async (req,res) => {
  console.log(req.query)
  const bill = req.body

  // OPERACIONES PARA INCLUIR EN BD
  let fecha1 = bill.fechaLecturaActual + 'T00:00:00'
  let fecha2 = bill.fechaLecturaAnterior + 'T00:00:00'
  let date1 = new Date(fecha1)
  let date2 = new Date(fecha2)
  let difDias = Math.abs((date1 - date2) / (1000 * 60 * 60 * 24));

  let consumoTotal = bill.lecturaActual - bill.lecturaAnterior
  let consDia = parseFloat((consumoTotal / difDias).toFixed(2))
  let valKw = parseFloat((bill.valorFactura / consumoTotal).toFixed(2))
  let valFactDia = parseFloat((bill.valorFactura / difDias).toFixed(2))

  let cadena = Math.floor((Math.random() * (999999 - 100000 + 1)) + 100000)

  // INCLUYENDO VALORES COMPUTADOS
  bill.diasFacturados = difDias
  bill.consumo = consumoTotal
  bill.consumoDia = consDia
  bill.valorKw = valKw
  bill.valorFacturaDia = valFactDia
  bill.idBills = cadena 

  try {
    const newBill = await aire.create(bill)

    res.redirect(`/showbills?${bill.propiedad}`)
  }

  catch (e) {
    console.log(e)
  }

}

controller.deleteBill = (req,res) => {
  const data = req.query.idBill.split("-")[0]
  const urlActual = req.query.idBill.split("-")[1]

  console.log(urlActual)

  aire.deleteOne({ _id : data })
  .then(result => {
    console.log(`Documento eliminado: ${result.deletedCount}`);
    res.redirect(`/showbills?${urlActual}`)
  })
  .catch(err => console.error(err));
}

controller.guest = (req,res) => {
  res.render('guest')
}

controller.newGuest = (req,res) => {
  res.render('newGuest')
}

controller.registerGuest = async (req,res) => {
  let cadena = Math.floor((Math.random() * (999999 - 100000 + 1)) + 100000)

  const dataGuest = req.body

  dataGuest.idGuest = cadena

  console.log(dataGuest)

  try {
    const newGuest = await guest.create(dataGuest)

    res.redirect(`/guest`)
  }

  catch (e) {
    console.log(e)
  }

}

controller.reservas = (req,res) => {
  booking.find({ }).sort( { checkIn : -1 } )
  .then(reservas => {
    res.render('reservas', {
      reservas: reservas
    })
  })
}

controller.newBooking = (req,res) => {
  res.render('newBooking')
}

controller.addBooking = async (req,res) => {

  let cadena = Math.floor((Math.random() * (999999 - 100000 + 1)) + 100000)

  const dataBooking = req.body

  dataBooking.idBooking = cadena

  try {
    const newGuest = await booking.create(dataBooking)

    res.redirect(`/reservas`)
  }

  catch (e) {
    console.log(e)
  }

}

module.exports = controller