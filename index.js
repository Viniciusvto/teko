// essa biblioteca é usada para criar um servidor web
const express = require('express');
const cors = require('cors');
const zonasCalor = require('./zonas-calor.json');
const fs = require('fs');

// cria uma instância do servidor web
const app = express();

const PORT = 3000; // porta que o servidor vai escutar

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { // rota raiz do servidor, quando alguém acessar a raiz do servidor, essa função será executada
  res.send('Tekó backend está no ar!');
});

app.get('/plantios', (req, res) => {
  fs.readFile('plantios.json', 'utf8', (erro, dados) => {
    if (erro) {
      res.status(500).send('Erro ao ler plantios');
      return;
    }
    res.json(JSON.parse(dados));
  });
});

app.get('/zonas-calor', (req, res) => {
  res.json(zonasCalor);
});

app.get('/temperatura', async (req, res) => {
  try {
    const latitude = -22.9099;
    const longitude = -47.0626;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`;

    const respostaExterna = await fetch(url);
    const dados = await respostaExterna.json();

    res.json({
      temperatura: dados.current.temperature_2m,
      unidade: dados.current_units.temperature_2m,
      atualizado_em: dados.current.time,
    });
  } catch (erro) {
    res.status(500).send('Erro ao buscar temperatura');
  }
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
  const novoPlantio = req.body;
  novoPlantio.id = Date.now().toString();
  novoPlantio.criado_em = new Date().toISOString();

  fs.readFile('plantios.json', 'utf8', (erro, dados) => {
    if (erro) {
      res.status(500).send('Erro ao ler plantios existentes');
      return;
    }

    const plantios = JSON.parse(dados);
    plantios.push(novoPlantio);

    fs.writeFile('plantios.json', JSON.stringify(plantios, null, 2), (erroEscrita) => {
      if (erroEscrita) {
        res.status(500).send('Erro ao salvar plantio');
        return;
      }
      res.status(201).json(novoPlantio);
    });
  });
});
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});

