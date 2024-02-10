//=== Server http z biblioteki Express =obsługuje '/' i '/about'
//[d:\JJ\SSD480\JJMSI\vs\repNode\SExpressApp2\app_express_2.js] trzeba
//przestawić w package.json: "start": "node app_express_2" aby ten plik wystartował
// npm install method-override --save
const express = require('express'); //express - name space //Instaled "express": "^4.14.0" npm module
const routes = require('./routes/router');
const bodyParser = require('body-parser'); //to read data using the POST method
const methodOverride = require('method-override'); // to be added to the Form method PUT, DELETE

const app_express = express(); //Node.Express - the most popular framework for creating web applications 
app_express.use(express.static(__dirname + '/public'));
app_express.set('view engine', 'hbs'); //Deklaracja modułu hbs - Silnik do szablonów html

app_express.use(bodyParser.json());
app_express.use(bodyParser.urlencoded({ extended: true }));

// override with POST having ?_method=DELETE
app_express.use(methodOverride('_method')); //New

app_express.use('/', routes);
//app_express.use('table', routes);

var hbs = require('hbs'); //Hbs engine template - declared to use partial views
hbs.registerPartials(__dirname + '/views/partials'); //activation folder partials

module.exports = app_express;
