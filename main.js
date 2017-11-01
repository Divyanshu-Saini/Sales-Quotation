'use strict';

//importing packages
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const apiai = require('apiai');

//Access keys
const APIAI_ACCESS_KEY = '2c9694a9e7f345538c7c0feeecc90cc6';

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

//Webhook for Sales Quotation
app.post('/sales-quotation', (req, res) => {   
        if (req.body.result.action === 'no') {
        res.json({
            "followupEvent": {
                "name": "PROPERTY_SALE"
            }
        })
    }
});

/*app.get('/', function (req, res) {
res.sendfile(__dirname + '/public/home.html');
});*/
//Starting server

const server = app.listen(app.get('PORT'), function () {
    console.log("Express server listening on port %d in %s mode", server.address().port, app.settings.env);
});
