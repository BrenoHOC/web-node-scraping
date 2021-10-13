const DocumentosController = require('../controllers/DocumentosController');

const express = require('express')
const app = express()
const fs = require('fs')
const router = express.Router()

module.exports = app => {

     app.get("/documento/download", (req, resp) => {

        DocumentosController.download(req, resp).then(function(data){
            resp.status(200).json(data);
        });
     })

     app.get("/documento/download/:nameFile", (req, resp) => DocumentosController.get(req, resp))
}