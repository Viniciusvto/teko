// essa biblioteca é usada para criar um servidor web
const express = require('express');

// cria uma instância do servidor web
const app = express();

const PORT = 3000; // porta que o servidor vai escutar

app.use(express.json());

app.get('/', (req, res) => { // rota raiz do servidor, quando alguém acessar a raiz do servidor, essa função será executada
  res.send('Tekó backend está no ar!');
});

app.post('/plantio', (req, res) => {
  console.log('Dados recebidos:', req.body);
  res.send('Plantio recebido com sucesso!');
});

app.listen(PORT, () => { // inicia o servidor e faz ele escutar na porta definida
  console.log(`Server is running on http://localhost:${PORT}`);
});

