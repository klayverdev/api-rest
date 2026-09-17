# api-rest

API bem simples pra criar, ler e deletar mensagens. Fiz pra treinar TypeScript com Express mesmo, nada de banco de dados — tudo fica na memória e some quando reinicia o servidor.

## Rodando

npm install
npm run dev

Sobe em `http://localhost:3000`. Se quiser mudar a porta:

PORT=4000 npm run dev

Pra build de produção:

npm run build
npm start

## Rotas

`POST /message` — cria uma mensagem. Manda `content` (obrigatório, string não vazia) e `author` (opcional). Se `content` vier vazio ou faltando, ou `author` não for string, retorna 400.

`GET /message/:id` — busca por id. 404 se não achar.

`DELETE /message/:id` — deleta. 204 se deu certo, 404 se não existir.

Qualquer outra rota cai em 404.

## Estrutura

- `index.ts` — as rotas e o app do Express
- `store.ts` — onde ficam as mensagens (um Map, nada demais)
- `validators.ts` — valida o corpo da requisição
- `types.ts` — os tipos

Separei validação e storage do Express pra poder trocar o Map por um banco depois sem mexer nas rotas, mas por enquanto tá simples assim mesmo.

## Licença

MIT
