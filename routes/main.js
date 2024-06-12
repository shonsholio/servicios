const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController')

router.get('/', mainController.main)

router.get('/registro', mainController.register)
router.post('/new-bill', mainController.newbill)
router.post('/delete-bill', mainController.deleteBill)

router.get('/showbills', mainController.showBills)

router.get('/guest', mainController.guest)
router.get('/new-guest', mainController.newGuest)

router.post('/new-guest', mainController.registerGuest)

router.get('/reservas', mainController.reservas)

router.get('/new-booking', mainController.newBooking)
router.post('/newBooking', mainController.addBooking)

router.post('/dataReserva', mainController.dataReserva)






module.exports = router 

