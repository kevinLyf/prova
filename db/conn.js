const mysql = require("mysql2");

//Configuração e conexão com banco
const conn = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "aluno_medio",
  password: "@lunoSenai23.",
  database: "prova",
});

// É necessário exporta esse modulo
module.exports = conn;
