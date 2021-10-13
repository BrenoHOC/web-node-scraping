const express = require('express');

module.exports = () => {
  const app = express();
  
  app.use(express.json())
  app.use(express.urlencoded({ extended: true}))

  require('../api/routes/Documentos.routes')(app);

  return app;
};