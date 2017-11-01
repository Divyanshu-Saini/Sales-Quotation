'use strict';

//importing packages
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const apiai = require('apiai');


//Access keys
const APIAI_ACCESS_KEY = '';

//initializing app
const app = express();
const spiaiApp = apiai(APIAI_ACCESS_KEY);

//Configuring port and other settings
app.set('PORT', (process.env.PORT || 2828));


//Using Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view options", {layout: false});
app.use(express.static(__dirname + '/public'));

//Webhook for openweather api
app.post('/sales-quotation', (req, res) => {
    
});

app.get('/', function (req, res) {
res.sendfile(__dirname + '/public/home.html');
});

//Starting server
const server = app.listen(app.get('PORT'), function () {
    console.log("Express server listening on port %d in %s mode", server.address().port, app.settings.env);
});
