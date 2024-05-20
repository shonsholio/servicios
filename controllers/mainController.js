const controller = {};
const aire = require('../models/air-e')

controller.main = (req,res) => {
  res.render('main')
}

controller.register = (req,res) => {
  res.render('registro')
}

controller.showbills = (req,res) => {

  const filtrado = req.url.split('?')[1]

  console.log(filtrado)

  aire.find( { propiedad : " " } )
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