// essa biblioteca é usada para criar um servidor web
const express = require('express');
const cors = require('cors');
const fs = require('fs');

// cria uma instância do servidor web
const app = express();

const PORT = 3000; // porta que o servidor vai escutar

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { // rota raiz do servidor, quando alguém acessar a raiz do servidor, essa função será executada
  res.send('Tekó backend está no ar!');
});

app.get('/especies', (req, res) => {
  fs.readFile('especies.json', 'utf8', (erro, dados) => {
    if (erro) {
      res.status(500).send('Erro ao ler o catálogo de espécies');
      return;
    }
    const especies = JSON.parse(dados);
    res.json(especies);
  });
});

app.post('/plantio', (req, res) => {
  console.log('Dados recebidos:', req.body);
  res.send('Plantio recebido com sucesso!');
});
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});

