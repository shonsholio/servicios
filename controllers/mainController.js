const controller = {};
const aire = require('../models/air-e')
const guest = require('../models/guest')
const booking = require('../models/booking')
const gasto = require('../models/gasto');
const { default: mongoose } = require('mongoose');


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

  console.log(data)

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
  const apto = req.query.propiedad
  const inicio = req.query.inicio
  const final = req.query.final

  if (( apto === undefined ) || ( apto === "jaussers" )) {
    booking.find({ }).sort( { checkIn : -1 } )
    .then(reservas => {
      // A PARTIR DE AQUI PUEDO HACER LAS OPERACIONES
      let contadorReservas = reservas.length
      let nochesEnero = 0
      let nochesFebrero = 0
      let nochesMarzo = 0
      let nochesAbril = 0
      let nochesMayo = 0
      let nochesJunio = 0
      let nochesJulio = 0
      let nochesAgosto = 0
      let nochesSeptiembre = 0
      let nochesOctubre = 0
      let nochesNoviembre = 0
      let nochesDiciembre = 0

      // MULTIPLICO POR 5 POR QUE SON 5 PROPIEDADES
      let dias2024 = {
        'enero': (31*5),
        'febrero': (29*5),
        'marzo': (31*5),
        'abril': (30*5),
        'mayo': (31*5),
        'junio': (30*5),
        'julio': (31*5),
        'agosto': (31*5),
        'septiembre': (30*5),
        'octubre': (31*5),
        'noviembre': (30*5),
        'diciembre': (31*5)
      }

      for (x = 0; x < contadorReservas; ++x) {
        let fechaIn = new Date(reservas[x].checkIn)
        let fechaOut = new Date(reservas[x].checkOut)
        let noches = ( fechaOut - fechaIn ) / ( 1000 * 60 * 60 * 24)
        let mesReserva = reservas[x].checkIn.split('-')[1]
        switch (mesReserva){
          case '01':
            nochesEnero = nochesEnero + noches;
            break;
          case '02':
            nochesFebrero = nochesFebrero + noches;
            break;
          case '03':
            nochesMarzo = nochesMarzo + noches;
            break;
          case '04':
            nochesAbril = nochesAbril + noches;
            break;
          case '05':
            nochesMayo = nochesMayo + noches;
            break;
          case '06':
            nochesJunio = nochesJunio + noches;
            break;
          case '07':
            nochesJulio = nochesJulio + noches;
            break;
          case '08':
            nochesAgosto = nochesAgosto + noches;
            break;
          case '09':
            nochesSeptiembre = nochesSeptiembre + noches;
            break;
          case '10':
            nochesOctubre = nochesOctubre + noches;
            break;
          case '11':
            nochesNoviembre = nochesNoviembre + noches;
            break;
          case '12':
            nochesDiciembre = nochesDiciembre + noches;
            break;
        }
      }

      let nochesPorMeses = {
        'enero': nochesEnero,
        'febrero': nochesFebrero,
        'marzo': nochesMarzo,
        'abril': nochesAbril,
        'mayo': nochesMayo,
        'junio': nochesJunio,
        'julio': nochesJulio,
        'agosto': nochesAgosto,
        'septiembre': nochesSeptiembre,
        'octubre': nochesOctubre,
        'noviembre': nochesNoviembre,
        'diciembre': nochesDiciembre
      }

      let porcOcup = {
        'enero': ((nochesEnero / dias2024.enero) * 100).toFixed(2),
        'febrero': ((nochesFebrero / dias2024.febrero) * 100).toFixed(2),
        'marzo': ((nochesMarzo / dias2024.marzo) * 100).toFixed(2),
        'abril': ((nochesAbril / dias2024.abril) * 100).toFixed(2),
        'mayo': ((nochesMayo / dias2024.mayo) * 100).toFixed(2),
        'junio': ((nochesJunio / dias2024.junio) * 100).toFixed(2),
        'julio': ((nochesJulio / dias2024.nochesJulio) * 100).toFixed(2),
        'agosto': ((nochesAgosto / dias2024.agosto) * 100).toFixed(2),
        'septiembre': ((nochesSeptiembre / dias2024.septiembre) * 100).toFixed(2),
        'octubre': ((nochesOctubre / dias2024.octubre) * 100).toFixed(2),
        'noviembre': ((nochesNoviembre / dias2024.noviembre) * 100).toFixed(2),
        'diciembre': ((nochesDiciembre / dias2024.diciembre) * 100).toFixed(2)
      }

      // RENDER PARA EJS
      res.render('reservas', {
        reservas: reservas,
        countReservas: contadorReservas,
        nochesPorMeses:  nochesPorMeses,
        propiedad: 'Jaussers Completo',
        porcOcup: porcOcup
      })
    })
  } else {
    var miradorS = apto + 'S'
    var miradorC = apto + 'C'

    booking.find({
      $or: [
        { propiedad: miradorS },
        { propiedad: miradorC },
        { propiedad: apto }
      ]
    }).sort( { checkIn : -1 } )
    .then(reservas => {
      // A PARTIR DE AQUI PUEDO HACER LAS OPERACIONES
      let contadorReservas = reservas.length
      let nochesEnero = 0
      let nochesFebrero = 0
      let nochesMarzo = 0
      let nochesAbril = 0
      let nochesMayo = 0
      let nochesJunio = 0
      let nochesJulio = 0
      let nochesAgosto = 0
      let nochesSeptiembre = 0
      let nochesOctubre = 0
      let nochesNoviembre = 0
      let nochesDiciembre = 0

      let dias2024 = {
        'enero': 31,
        'febrero': 29,
        'marzo': 31,
        'abril': 30,
        'mayo': 31,
        'junio': 30,
        'julio': 31,
        'agosto': 31,
        'septiembre': 30,
        'octubre': 31,
        'noviembre': 30,
        'diciembre': 31
      }

      for (x = 0; x < contadorReservas; ++x) {
        let fechaIn = new Date(reservas[x].checkIn)
        let fechaOut = new Date(reservas[x].checkOut)
        let noches = ( fechaOut - fechaIn ) / ( 1000 * 60 * 60 * 24)
        let mesReserva = reservas[x].checkIn.split('-')[1]
        switch (mesReserva){
          case '01':
            nochesEnero = nochesEnero + noches;
            break;
          case '02':
            nochesFebrero = nochesFebrero + noches;
            break;
          case '03':
            nochesMarzo = nochesMarzo + noches;
            break;
          case '04':
            nochesAbril = nochesAbril + noches;
            break;
          case '05':
            nochesMayo = nochesMayo + noches;
            break;
          case '06':
            nochesJunio = nochesJunio + noches;
            break;
          case '07':
            nochesJulio = nochesJulio + noches;
            break;
          case '08':
            nochesAgosto = nochesAgosto + noches;
            break;
          case '09':
            nochesSeptiembre = nochesSeptiembre + noches;
            break;
          case '10':
            nochesOctubre = nochesOctubre + noches;
            break;
          case '11':
            nochesNoviembre = nochesNoviembre + noches;
            break;
          case '12':
            nochesDiciembre = nochesDiciembre + noches;
            break;
        }
      }

      let nochesPorMeses = {
        'enero': nochesEnero,
        'febrero': nochesFebrero,
        'marzo': nochesMarzo,
        'abril': nochesAbril,
        'mayo': nochesMayo,
        'junio': nochesJunio,
        'julio': nochesJulio,
        'agosto': nochesAgosto,
        'septiembre': nochesSeptiembre,
        'octubre': nochesOctubre,
        'noviembre': nochesNoviembre,
        'diciembre': nochesDiciembre
      }

      let porcOcup = {
        'enero': ((nochesEnero / dias2024.enero) * 100).toFixed(2),
        'febrero': ((nochesFebrero / dias2024.febrero) * 100).toFixed(2),
        'marzo': ((nochesMarzo / dias2024.marzo) * 100).toFixed(2),
        'abril': ((nochesAbril / dias2024.abril) * 100).toFixed(2),
        'mayo': ((nochesMayo / dias2024.mayo) * 100).toFixed(2),
        'junio': ((nochesJunio / dias2024.junio) * 100).toFixed(2),
        'julio': ((nochesJulio / dias2024.nochesJulio) * 100).toFixed(2),
        'agosto': ((nochesAgosto / dias2024.agosto) * 100).toFixed(2),
        'septiembre': ((nochesSeptiembre / dias2024.septiembre) * 100).toFixed(2),
        'octubre': ((nochesOctubre / dias2024.octubre) * 100).toFixed(2),
        'noviembre': ((nochesNoviembre / dias2024.noviembre) * 100).toFixed(2),
        'diciembre': ((nochesDiciembre / dias2024.diciembre) * 100).toFixed(2)
      }

      res.render('reservas', {
        reservas: reservas,
        countReservas: contadorReservas,
        nochesPorMeses:  nochesPorMeses,
        propiedad: reservas[0].propiedad,
        porcOcup: porcOcup
      })
    })
  }

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

controller.dataReserva = (req,res) => {
  const apto = req.body.apto
  const inicio = req.body.inicio
  const final = req.body.final

  console.log(inicio)
  console.log(final)

  res.redirect(`/reservas?propiedad=${apto}&inicio=${inicio}&final=${final}`)
}

controller.gastos = (req,res) => {
  gasto.find({}).sort({ fecha: -1 })
  .then(gastos => {

    let gastosEnero = 0
    let gastosFebrero = 0
    let gastosMarzo = 0
    let gastosAbril = 0
    let gastosMayo = 0
    let gastosJunio = 0


    for (y = 0; y < gastos.length; ++ y){
      let mes = gastos[y].fecha.split('-')[1]
      switch (mes) {
        case '01':
          gastosEnero = gastosEnero + gastos[y].valorGasto ;
          break;
        case '02':
          gastosFebrero = gastosFebrero + gastos[y].valorGasto ;
          break;
        case '03':
          gastosMarzo = gastosMarzo + gastos[y].valorGasto ;
          break;
        case '04':
          gastosAbril = gastosAbril + gastos[y].valorGasto ;
          break;
        case '05':
          gastosMayo = gastosMayo + gastos[y].valorGasto ;
          break;
        case '06':
          gastosJunio = gastosJunio + gastos[y].valorGasto ;
          break;
      }
    } 
  
    let gastosPorMes = {
      'enero': gastosEnero,
      'febrero': gastosFebrero,
      'marzo': gastosMarzo,
      'abril': gastosAbril,
      'mayo': gastosMayo,
      'junio': gastosJunio
    }

    res.render('gastos', {
      propiedad: 'LA QUE SEA',
      gastos: gastos,
      gastosPorMes: gastosPorMes
    })
  })

}

controller.nuevoGasto = async (req,res) => {
  const data = req.body
  console.log(data)

  try {
    const newExpense = await gasto.create(data)
    res.redirect('/gastos')
  }

  catch (e) {
    console.log(e)
  }
}

controller.deleteBooking = async (req,res) => {
      
  const id = req.query

  console.log(id)

  booking.deleteOne({ _id : id.id })
  .then(result => {
    console.log(`Documento eliminado: ${result.deletedCount}`);
    res.redirect('/reservas')
  })
  .catch(err => console.error(err));

}

controller.updateBooking = async (req,res) => {

  const id = req.query
  console.log(id)
  booking.find({ _id : id.id })
  .then(resultado => {
    res.render('updateBook' , {
      data: resultado,
      propiedad: 'LO QUE VIENE'
    })  
  })
}

controller.actualizar = async (req,res) => {

  booking.findOneAndReplace({ _id: req.body._id }, req.body)
  .then((error) => {
    console.log(error);
    res.redirect('reservas')
  })

}

module.exports = controller