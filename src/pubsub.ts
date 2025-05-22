import { createClient, RedisClientType } from 'redis';

class RedisPubSub {
    private static publisher: RedisClientType | null = null;
    private static subscriber: RedisClientType | null = null;
    private static connected = false;

    private static async connect() {
        if (this.connected) return;

        this.publisher = createClient();
        this.subscriber = createClient();

        this.publisher.on('error', (err) => console.error('Publisher Error:', err));
        this.subscriber.on('error', (err) => console.error('Subscriber Error:', err));

        await Promise.all([this.publisher.connect(), this.subscriber.connect()]);
        this.connected = true;
    }

    public static async publish(channel: string, message: unknown): Promise<void> {
        await this.connect();
        if (!this.publisher) throw new Error('Publisher client not initialized');
        await this.publisher.publish(channel, JSON.stringify(message));
    }

    public static async subscribe<T>(
        channel: string,
        callback: (message: T) => void
    ): Promise<void> {
        await this.connect();
        if (!this.subscriber) throw new Error('Subscriber client not initialized');

        // Redis v4 subscribe returns a Promise resolving once subscription starts
        await this.subscriber.subscribe(channel, (message: string) => {
            try {
                callback(JSON.parse(message) as T);
            } catch {
                callback(message as unknown as T); // fallback in case JSON parsing fails
            }
        });
    }
}

export default RedisPubSub;
