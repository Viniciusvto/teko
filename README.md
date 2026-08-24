# Tekó — Backend

API que serve dados para o app Tekó — uma iniciativa para direcionar plantio de árvores urbanas para áreas de maior necessidade em Campinas/SP, combatendo ilhas de calor.

Este é o servidor (Node.js + Express). O aplicativo mobile está no repositório separado:
[teko-app](https://github.com/Viniciusvto/teko-app)

## Endpoints
- `GET /especies` — catálogo de espécies recomendadas
- `GET /zonas-calor` — pontos de calor mapeados
- `GET /temperatura` — temperatura atual via Open-Meteo
- `POST /plantio` — registra um novo plantio
- `GET /plantios` — lista plantios registrados

## Como rodar
\`\`\`bash
npm install
node index.js
\`\`\`
