const express = require("express");
const exphbs = require("express-handlebars");
const PORT = 3333;

//Importar o módulo conn para as operações com o banco
const db = require("./db/conn");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

//Middleware para arquivos estáticos
app.use(express.static("public"));

app.get("/", (req, res) => {
  const query = "SELECT * FROM tb_products";
  db.query(query, (err, result) => {
    if (err) throw console.log(err);
    return res.render("home", { result });
  });
});

app.get("/register", (req, res) => {
  return res.render("register");
});

app.post("/register/product", (req, res) => {
  const { title, description, price, amount, category } = req.body;
  const query = `INSERT INTO tb_products(title, description, category, price, amount) VALUES ('${title}', '${description}', '${category}', '${price}', '${amount}')`;

  db.query(query, (err, result) => {
    if (err) throw console.log(err);
    console.log(result);
    return res.status(201).redirect("/");
  });
});

app.get("/products/delete/:id", (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM tb_products where id = ${id}`;

  db.query(query, (err, result) => {
    if (err) throw console.log(err);
    return res.redirect("/");
  });
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM tb_products WHERE id = ${id}`;

  db.query(query, (err, result) => {
    if (err) throw console.log(err);
    console.log(result);
    return res.render("details", { result });
  });
});

app.get("/products/edit/:id", (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM tb_products WHERE id = ${id}`;

  db.query(query, (err, result) => {
    if (err) throw console.log(err);
    return res.render("edit", { result });
  });
});

app.post("/products/edit/edit/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, price, amount, category } = req.body;
  console.log({ title, description, price, amount, category });
  const query = `UPDATE tb_products SET title = '${title}', description = '${description}', price = '${price}', amount = '${amount}', category = '${category}' WHERE id = ${id}`;

  db.query(query, (err, result) => {
    if (err) throw console.log(err);
    return res.redirect("/");
  });
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
