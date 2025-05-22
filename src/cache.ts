import client from './connection';

export async function getOrSetCache<T>(
    key: string,
    cb: () => Promise<T>,
    expire: number = 3600
): Promise<T> {
    const cached = await client.get(key);
    if (cached) {
        return JSON.parse(cached) as T;
    }

    const freshData = await cb();
    await client.setEx(key, expire, JSON.stringify(freshData));
    return freshData;
}

export async function clearCache(key: string): Promise<number> {
    return client.del(key);
}
