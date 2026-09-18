# api-rest

A very simple API for creating, reading, and deleting messages. I built it to practice TypeScript with Express. There’s no database — everything is stored in memory and gets wiped when the server restarts.

## Running

Copy `.env.example` to `.env` and add any value to `API_KEY` (it can be any string, as long as it matches the key you send in your requests):

```bash
cp .env.example .env

npm install
npm run dev
```

The API runs at `http://localhost:3000`. If you want to change the port, just update `PORT` in `.env`.

For a production build:

```bash
npm run build
npm start
```

If you forget to configure `API_KEY`, the API will still start normally, but it will reject every request and show a warning in the console.

## Authentication

Every `/message` route requires the API key in the `x-api-key` header:

```bash
curl -H "x-api-key: your-api-key-here" http://localhost:3000/message/some-id
```

Without the header, or with an incorrect key, the API returns `401`.

The key is never stored in the code, only in `.env` (which is not committed to Git).

## Routes

`POST /message` — creates a message. Send `content` (required, non-empty string) and `author` (optional). If `content` is empty or missing, or if `author` is not a string, the API returns `400`.

`GET /message/:id` — gets a message by ID. Returns `404` if the message is not found.

`DELETE /message/:id` — deletes a message. Returns `204` if successful, or `404` if the message does not exist.

All three routes require the `x-api-key` header, as mentioned above.

Any other route returns `404` (this one does not require an API key, since there is no reason for it to).

## Structure

* `index.ts` — Express app and routes
* `auth.ts` — middleware that validates the `x-api-key`
* `store.ts` — stores the messages (a `Map`, nothing fancy)
* `validators.ts` — validates the request body
* `types.ts` — TypeScript types

I separated validation and storage from Express so I can replace the `Map` with a database later without having to change the routes. For now, I’m keeping it simple.
