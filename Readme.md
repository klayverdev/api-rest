# api-rest

API bem simples pra criar, ler e deletar mensagens. Fiz pra treinar TypeScript com Express mesmo, nada de banco de dados — tudo fica na memória e some quando reinicia o servidor.

## Rodando

Copia o `.env.example` pra `.env` e coloca uma chave qualquer no `API_KEY` (pode ser qualquer string, só precisa bater com a que você manda nas requisições):

cp .env.example .env

npm install
npm run dev

Sobe em `http://localhost:3000`. Se quiser mudar a porta, muda o `PORT` no `.env` mesmo.

Pra build de produção:

npm run build
npm start

Se esquecer de configurar o `API_KEY`, a API sobe normal mas fica rejeitando tudo (e avisa no console).

## Autenticação

Toda rota de `/message` pede a chave no header `x-api-key`:

curl -H "x-api-key: sua-chave-aqui" http://localhost:3000/message/algum-id

Sem o header, ou com a chave errada, volta 401. A chave nunca fica no código, só no `.env` (que não vai pro git).

## Rotas

`POST /message` — cria uma mensagem. Manda `content` (obrigatório, string não vazia) e `author` (opcional). Se `content` vier vazio ou faltando, ou `author` não for string, retorna 400.

`GET /message/:id` — busca por id. 404 se não achar.

`DELETE /message/:id` — deleta. 204 se deu certo, 404 se não existir.

Essas três pedem `x-api-key`, como falei acima.

Qualquer outra rota cai em 404 (essa aqui não pede chave, nem faz sentido).

## Estrutura

- `index.ts` — as rotas e o app do Express
- `auth.ts` — middleware que confere o `x-api-key`
- `store.ts` — onde ficam as mensagens (um Map, nada demais)
- `validators.ts` — valida o corpo da requisição
- `types.ts` — os tipos

Separei validação e storage do Express pra poder trocar o Map por um banco depois sem mexer nas rotas, mas por enquanto tá simples assim mesmo.
