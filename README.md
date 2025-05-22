# RediKit

TypeScript Redis utility toolkit for caching and Pub/Sub. Lightweight, fast, and easy to use.

---

## Features

- Cache management with `getOrSetCache` and `clearCache`
- Pub/Sub helpers with `publish` and `subscribe`
- Built with TypeScript for type safety
- Uses official `redis` v4 client

---

## Installation

```bash
npm install redikit
```

---

## Usage

### Connection Setup

```ts
import client from 'redikit/connection';

// client is a connected RedisClientType instance
```

### Cache Utilities

```ts
import { getOrSetCache, clearCache } from 'redikit/cache';

async function fetchData() {
  const data = await getOrSetCache('my-key', async () => {
    // fetch fresh data from DB or API
    return { foo: 'bar' };
  }, 3600);

  console.log(data);
}

async function clearMyCache() {
  await clearCache('my-key');
}
```

### Pub/Sub Utilities

```ts
import { publish, subscribe } from 'redikit/pubsub';

await subscribe('my-channel', (message) => {
  console.log('Received message:', message);
});

await publish('my-channel', { hello: 'world' });
```

---

## Scripts

- `npm run build` — compile TypeScript to JavaScript
- `npm run dev` — run with ts-node in development
- `npm run lint` — lint source files with ESLint
- `npm start` — run compiled code

---

## Build

To build the package:

```bash
npm run build
```

Output files will be in the `dist` folder, including type declarations (`.d.ts`).

---

## Publishing

Make sure you:

1. Increment the version in `package.json`.
2. Run `npm run build`.
3. Run `npm publish`.

---

## Configuration

- Redis connection URL is configured with environment variable `REDIS_URL`.
- Default fallback: `redis://localhost:6379`.

---

## License

MIT License © Nurul Islam Rimon

---

## Repository

[GitHub - nurulislamrimon/redikit](https://github.com/nurulislamrimon/redikit)

---

## Keywords

redis, cache, pubsub, typescript, redis-utils, node-redis
