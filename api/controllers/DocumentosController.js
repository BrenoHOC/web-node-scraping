const axios = require('axios');
const jsdom = require('jsdom');
const fs = require('fs');
const { downloadDocuments, mergingDocuments } = require('../helpers/file.js');
const {JSDOM} = jsdom;

async function download(req, resp) {

    const url = 'http://omnissolucoes.com/teste3/';
        
    const html = await axios.get(url);
    
    const dom = new JSDOM(html.data);
    
    const querySelector = dom.window.document.querySelectorAll('li');
    
    var documents = {};
    var filesToMerging = new Array();
    
    for (const [index, value] of querySelector.entries()) {
        
        var uri = url + value.children[0].getAttribute('href');
        
        var fileName = value.textContent.trim();
        
        var codeName = value.children[0].getAttribute('codigo');
        
        filesToMerging[index] = codeName + '.pdf';
        
        documents[index] ={
            'nome_arquivo': fileName,
            'url': uri,
            'codigo': codeName
        }

        await downloadDocuments(uri, codeName + '.pdf');   
    }
    console.log(documents);

    setTimeout(async function(){
        await mergingDocuments(filesToMerging);
    }, 3000);
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    documents['link_download'] = fullUrl + '/final.pdf';

    return documents;
};

function get(req, resp) {

    const path = './downloads/documents/' + req.params.nameFile;
    
    if (fs.existsSync(path)) {
        resp.contentType("application/pdf");
        fs.createReadStream(path).pipe(resp)
    } else {
        resp.status(500).send('Arquivo não encontrado.');
    }
}

module.exports.download = download;
module.exports.get = get;