import { createClient, RedisClientType } from 'redis';

const client: RedisClientType = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
});

client.on('error', (err) => console.error('Redis Client Error', err));

async function connectClient(): Promise<void> {
    try {
        await client.connect();
        console.log('Redis client connected');
    } catch (error) {
        console.error('Redis connection failed', error);
    }
}

// Connect immediately but allow callers to also await this if needed
const connectionPromise = connectClient();

export { client, connectionPromise };
export default client;
