'use strict';

//importing packages
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const apiai = require('apiai');
const json2csv = require('json2csv');
const fs = require('fs');


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
app.set("view options", { layout: false });
app.use(express.static(__dirname + '/public'));

//Webhook for openweather api
app.post('/sales-quotation', (req, res) => {

    if (req.body.result.action === 'no') {
        res.json({
            "followupEvent": {
                "name": "SALES_QUOTATION"
            }

        })
    }

    //Showing quotation
    if (req.body.result.action == 'Two-Wheeler.Quotation') {
        let bikename = req.body.result.parameters['bike_name'];
        let bikecolor = req.body.result.parameters['color'];
        let bikebudget = req.body.result.parameters['unit-currency'];
        // JSON to CSV
        let bike = {
            "Name": bikename,
            "Color": bikecolor,
            "Budget": bikebudget
        };
        let fields = ["Name", "Color", "Budget"];
        let csv = json2csv({ data: bike, fields: fields });
        fs.writeFile('public/file.csv', csv, function (err) {
            if (err) throw err;
            console.log('file saved');
        });
        return res.json({
            "messages": [
                {

                    "displayText": "The quotations available are",
                    "platform": "google",
                    "textToSpeech": "The quotations available are",
                    "type": "simple_response"
                },
                {
                    "items": [
                        {
                            "description": "The Bajaj Pulsar 200NS is a sports bike made by Bajaj Auto. It comes under: 1000$",
                            "image": {
                                "url": "http://www.choosemybike.in/media/kcfinder/upload/images/bajaj-pulsar-200-ns.jpg"
                            },
                            "optionInfo": {
                                "key": "itemOne",
                                "synonyms": [
                                    "thing one",
                                    "object one"
                                ]
                            },
                            "title": "Pulsar 200 NS"
                        },
                        {
                            "description": "The Bajaj Pulsar 200 Rsis a sports bike made by Bajaj Auto. It comes under: 1350$",
                            "image": {
                                "url": "https://imgd.aeplcdn.com/600x337/bw/ec/27078/Bajaj-Pulsar-RS200-Front-threequarter-90540.jpg?wm=2"
                            },
                            "optionInfo": {
                                "key": "itemTwo",
                                "synonyms": [
                                    "thing two",
                                    "object two"
                                ]
                            },
                            "title": "Baja Pulsar 200 RS"
                        }
                    ],
                    "platform": "google",
                    "type": "carousel_card"
                }
            ]
        });
    }

    //Download Quotation for two wheeler
    if (req.body.result.action == 'Two-Wheeler.Two-Wheeler-Download') {
        return res.json({
            "messages": [{
                "displayText": "Click on this link to download the file",
                "platform": "google",
                "textToSpeech": "Click on this link to download the file",
                "type": "simple_response"
            }, {
                "destinationName": "Destination Name",
                "platform": "google",
                "type": "link_out_chip",
                "url": "https://sales-quotation.herokuapp.com/download"
            }
            ]
        });
    }

});

//home page
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/public/home.html');
});

//Quotation download link
app.get('/download', function (req, res) {
    res.redirect("/file.csv");
});

//Starting server
const server = app.listen(app.get('PORT'), function () {
    console.log("Express server listening on port %d in %s mode", server.address().port, app.settings.env);
});
