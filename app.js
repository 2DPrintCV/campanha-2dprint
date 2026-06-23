const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('.produtos.db');

app.use(express.json());
app.use(express.static('public'));

app.get('apiprodutos', (req, res) = {
  db.all('SELECT  FROM produtos WHERE ativo = 1', [], (err, rows) = {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
});

app.post('apiprodutos', (req, res) = {
  const { nome, descricao, imagem, preco, quantidade_minima, ativo } = req.body;
  db.run(
    'INSERT INTO produtos (nome, descricao, imagem, preco, quantidade_minima, ativo) VALUES (, , , , , )',
    [nome, descricao, imagem, preco, quantidade_minima, ativo],
    function (err) {
      if (err) return res.status(500).send(err);
      res.json({ id this.lastID });
    }
  );
});

app.put('apiprodutosidstatus', (req, res) = {
  const { ativo } = req.body;
  db.run('UPDATE produtos SET ativo =  WHERE id = ', [ativo, req.params.id], (err) = {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

app.listen(3000, () = console.log('Servidor rodando na porta 3000'));
