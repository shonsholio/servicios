const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController')

router.get('/', mainController.main)

router.get('/registro', mainController.register)
router.post('/new-bill', mainController.newbill)
router.post('/delete-bill', mainController.deleteBill)


router.get('/showbills', mainController.showBills)


module.exports = router 

