const controller = {};
const aire = require('../models/air-e')

controller.main = (req,res) => {
  res.render('main')
}

controller.register = (req,res) => {
  res.render('registro')
}

controller.showbills = (req,res) => {

  const filtrado = Object.keys(req.query)

  aire.find( { propiedad : filtrado[0] } )
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