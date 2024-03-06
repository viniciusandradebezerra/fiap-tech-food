
FROM node:latest


WORKDIR /usr/src/app

# Copia os arquivos `package.json` e `package-lock.json` (ou `yarn.lock`)
COPY package*.json ./

# Antes de instalar as dependências, instale quaisquer ferramentas necessárias.
# Para imagens baseadas em Debian, as ferramentas de build geralmente já estão disponíveis,
# mas você pode instalar ou atualizar pacotes específicos se necessário.

# Instala as dependências do projeto
RUN npm install

# Copia os arquivos do projeto para o diretório de trabalho
COPY . .

# Compila a aplicação
RUN npm run build

# Expõe a porta que a aplicação usará
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "run", "start:prod"]
