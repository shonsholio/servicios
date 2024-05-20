const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const path = require('path');

const app = express();

dotenv.config({ path: './config.env' });

mongoose.connect(process.env.MONGODB_URI)
  .then(connection => {
    console.log('CONECTADOS A MONGODB')
  })
  .catch('Error al conectar a Mongo')

const mainRoutes = require('./routes/main')

// SETTINGS
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'))

// MIDDLEWARES
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// ROUTES
app.use('/', mainRoutes)

app.listen(app.get('port'), () => {
  console.log('CONECTADOS AL PUERTO 3000')
})