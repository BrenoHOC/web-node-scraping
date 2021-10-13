const app = require('./config/express')();

// RODANDO NOSSA APLICAÇÃO NA PORTA SETADA
app.listen(3000, () => {
  console.log(`Servidor rodando na porta 3000`)
});