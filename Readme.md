# Message API

A minimal REST API for creating, reading, and deleting messages.

Built with TypeScript, Node.js, and Express. Storage is in-memory, so data is cleared on every restart — this is intentional, not a limitation to work around.

## Requirements

- Node.js 18+
- npm

## Getting started

```bash
npm install
npm run dev
```

The server starts on `http://localhost:3000`. Change the port with `PORT`:

```bash
PORT=4000 npm run dev
```

For a production build:

```bash
npm run build
npm start
```

## API

### `POST /message`

Creates a message.

```json
{
  "content": "Hello world",
  "author": "gab"
}
```

| Field     | Type   | Required | Notes                          |
| --------- | ------ | -------- | ------------------------------ |
| `content` | string | yes      | Must be non-empty after trim.  |
| `author`  | string | no       | Rejected with 400 if not a string. |

**Responses**

| Status | When                                             |
| ------ | ------------------------------------------------ |
| `201`  | Message created. Returns the message.             |
| `400`  | `content` missing/empty, `author` not a string, or malformed JSON. |

### `GET /message/:id`

| Status | When                    |
| ------ | ----------------------- |
| `200`  | Message found. Returns it. |
| `404`  | No message with that id. |

### `DELETE /message/:id`

| Status | When                    |
| ------ | ----------------------- |
| `204`  | Message deleted.         |
| `404`  | No message with that id. |

Any other route returns `404`.

## Project structure

```
src/
├── index.ts       # Express app, routes, error handling
├── store.ts       # In-memory message storage
├── validators.ts  # Request validation, decoupled from Express
└── types.ts       # Shared TypeScript types
```

Routes stay thin — they delegate validation to `validators.ts` and persistence to `store.ts`, so either can be swapped or unit-tested independently.

## Notes

- Messages live in a `Map` and are lost on restart. Swap `MessageStore` for a database-backed implementation if persistence is needed; the route handlers won't change.
- No external validation library — the ruleset is small enough that plain functions are clearer than a schema dependency.

## License

MIT
