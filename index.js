const axios = require('axios');
const jsdom = require('jsdom');
const { downloadDocuments, mergingDocuments } = require('./file');
const {JSDOM} = jsdom;

(async () => {
    const url = 'http://omnissolucoes.com/teste3/';

    const html = await axios.get(url);

    const dom = new JSDOM(html.data);

    const title = dom.window.document.querySelectorAll('li');

    var documents = [];
    var filesToMerging = [];
    
    title.forEach(function(value, index) {
        
        var uri = url + value.children[0].getAttribute('href');
                
        var fileName = value.textContent.trim();
        
        var codeName = value.children[0].getAttribute('codigo');

        filesToMerging[index] = codeName + '.pdf';

        documents[index] = Array();
        documents[index]['nome_arquivo'] = fileName;
        documents[index]['url'] = uri;
        documents[index]['codigo'] = codeName;

    //    downloadDocuments(uri, codeName + '.pdf');

    
});

    mergingDocuments(filesToMerging);
   
})();