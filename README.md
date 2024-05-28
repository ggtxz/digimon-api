# Digimon API 
![Badge](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Badge](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

Desenvolvido por:   
[Gustavo Gimenez Teixeira](https://github.com/ggtxz) - 20210102097   

Este repositório contém o backend do projeto Digimon API, uma aplicação desenvolvida para filtrar digimons.

---

## Pré-requisitos

- Node.js (versão 20 ou superior) 
- PostgreSQL (instalado e em execução)
- Git (Instalado)

## Instalação

1. Clone o repositório e instale as dependencias utilizando os seguintes comandos:

```bash
git clone https://github.com/ggtxz/digimon-api.git
cd digimon-api
npm install
```

2. Crie um arquivo .env na raiz do projeto e adicione o seguinte conteúdo:
```plaintext
DATABASE_URL="postgresql://fulano:senhafulano@localhost:5432/digimon?schema=public"

PORT=3000
```
fulano: seu usuário do postgresql
senhafulano: senha do usuário fulano para acessar o postgresql  
5432: porta que o potgres roda na sua máquina (5432 é a padrão)

3. Execute as migrações do banco de dados utilizando o Prisma:
```bash
npx prisma migrate dev
```

## Executando o Servidor
Após concluir os passos de instalação, você pode executar o servidor utilizando o seguinte comando:
```bash
npm run dev
```

## Executando os Testes
Com o servidor desligado, rode o seguinte comando para realizar os testes unitários:
```bash
npm test
```
## Executando o Swagger
Com o servidor ligado, acesse o seguinte link para utilizar o swagger:

http://localhost:3000/api-docs/

## API Endpoints
-`GET /digimon/`: Retorna todos os digimons 

-`GET /digimon/nome/:digiName`: Retorna os digimons que contenham os caracteres pesquisados no nome

-`GET /digimon/level/:digiLevel`: Retorna todos os digimons que estão no level escolhido (case sensitive).

-`GET /digimon/:digiLevel/:digiName`: Retorna um Digimon que esteja no level escrito (case sensitive) e que contenha os caracteres pesquisados no nome.

Parâmetros aceitos em digiLevel:
- Fresh
- In Training (In Training, InTraining ou In%20Training)
- Rookie
- Champion
- Ultimate
- Mega
- Armor 

Lembre-se de respeitar as letras maiúsculas e minúsculas

Lembre-se de ajustar as informações necessárias, como o usuário do banco de dados, a senha e a porta, de acordo com o ambiente de desenvolvimento.
