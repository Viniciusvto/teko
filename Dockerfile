# Imagem base: Node 22 sobre Alpine Linux
FROM node:22-alpine

# Pasta de trabalho dentro do container
WORKDIR /app

# Primeiro só a lista de dependências (aproveita o cache)
COPY package.json package-lock.json ./

# Instala as versões registradas no package-lock.json
RUN npm ci --omit=dev

# código
COPY . .

# Documenta a porta que a API usa
EXPOSE 3000

# Comando que inicia a API quando o container sobe
CMD ["node", "index.js"]





