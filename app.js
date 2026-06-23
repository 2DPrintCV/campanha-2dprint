// Importa dependências
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

// Configurações básicas
app.use(express.json());
app.use(express.static('public'));

// Conexão com o banco de dados
const db = new sqlite3.Database('./produtos.db');

// 🔹 Rota para listar produtos ativos
app.get('/api/produtos', (req, res) => {
  db.all('SELECT * FROM produtos WHERE ativo = 1', [], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar produtos:', err);
      return res.status(500).send(err);
    }
    res.json(rows);
  });
});

// 🔹 Rota para cadastrar novo produto
app.post('/api/produtos', (req, res) => {
  const { nome, descricao, imagem, preco, quantidade_minima, ativo } = req.body;
  db.run(
    'INSERT INTO produtos (nome, descricao, imagem, preco, quantidade_minima, ativo) VALUES (?, ?, ?, ?, ?, ?)',
    [nome, descricao, imagem, preco, quantidade_minima, ativo],
    function (err) {
      if (err) {
        console.error('Erro ao inserir produto:', err);
        return res.status(500).send(err);
      }
      res.json({ id: this.lastID });
    }
  );
});

// 🔹 Rota para ativar/desativar produto
app.put('/api/produtos/:id/status', (req, res) => {
  const { ativo } = req.body;
  db.run('UPDATE produtos SET ativo = ? WHERE id = ?', [ativo, req.params.id], (err) => {
    if (err) {
      console.error('Erro ao atualizar status:', err);
      return res.status(500).send(err);
    }
    res.sendStatus(200);
  });
});

// 🔹 Inicializa o servidor
app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
