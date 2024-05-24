const controller = {};
const aire = require('../models/air-e')

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
  bill.idBill = cadena

  try {
    const newBill = await aire.create(bill)

    res.redirect('/')
  }

  catch (e) {
    console.log(e)
  }

}

controller.deleteBill = (req,res) => {
  const data = req.query.idBill

  aire.deleteOne({ _id : data })
  .then(result => {
    console.log(`Documento eliminado: ${result.deletedCount}`);
    res.redirect('/')
  })
  .catch(err => console.error(err));
}

module.exports = controller