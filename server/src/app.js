//setting up our configuration.
const express = require('express');
const cors = require("cors");

const app = express();

//setting our middlewares up.
app.listen(4000, () => {
    console.log('App listening on port 3000!');
});

//our parser.
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

//here we require our db connection module.
require('./database');

//here we require our routes.
const routes = require('./controller/authController');

//here we are going to use our routes.
app.use('/', routes);