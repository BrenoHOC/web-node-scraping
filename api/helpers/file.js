const { PDFDocument } = require("pdf-lib");
const fs = require('fs');
const axios = require("axios");

async function  downloadDocuments(uri, name) {
    let pdfBuffer = await axios.get(uri, {responseType: "stream"});

    pdfBuffer.data.pipe(fs.createWriteStream('./downloads/documents/' + name));
}

async function mergingDocuments(files) {
    
    var doc = await PDFDocument.create();
    
    for(const file of files) {
       
        var content = await PDFDocument.load(fs.readFileSync('./downloads/documents/' + file));
        var [contentPages] = await doc.copyPages(content, [0]);
        doc.addPage(contentPages);        
        
    }
    fs.writeFileSync('./downloads/documents/final.pdf', await doc.save());

    return './downloads/documents/final.pdf';
}

module.exports.downloadDocuments = downloadDocuments;
module.exports.mergingDocuments = mergingDocuments;