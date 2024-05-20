const controller = {};
const aire = require('../models/air-e')

controller.main = (req,res) => {
  res.render('main')
}

controller.register = (req,res) => {
  res.render('registro')
}

controller.showbills = (req,res) => {

  const filtrado = req.headers.host

  console.log(req.headers)

  aire.find( { propiedad : filtrado } )
  .then(factura => {
    res.render('bills', {
      bills: factura
    })
  })
}

controller.newbill = async (req,res) => {
  const bill = req.body

  try {
    const newBill = await aire.create(bill)

    res.redirect('/')
  }

  catch (e) {
    console.log(e)
  }

}

module.exports = controller