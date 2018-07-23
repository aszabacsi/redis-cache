import * as redis from 'redis';

interface Cache {
  set(key: string, value: any): void;
  get(key: string): any;
}

type Primitive = boolean | null | undefined | number | string;

class RedisCache implements Cache {

  public client: redis.RedisClient;

  constructor(connString: string) {
    this.client = redis.createClient(connString);
  }

  public set(key: string, value: string | number | object): void {

    if (typeof value === 'string') {
      this.client.set(key, value);
    }

    if (typeof value === 'number') {
      this.client.set(key, value.toString());
    }

    if (typeof value === 'object') {
      this.client.set(key, JSON.stringify(value));
    }

  }

  public get(key: string): Promise<Primitive | object> {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, value: Primitive | object) => {
        if (err) reject(err);
        else resolve(value);
      });
    });
  }

  public hset(key: string, field: string, value: string): void {
    this.client.hset(key, field, value);
  }

  public hget(key: string, field: string): Promise<Primitive | object> {
    return new Promise((resolve, reject) => {
      this.client.hget(key, field, (err, value: Primitive | object) => {
        if (err) reject(err);
        else resolve(value);
      });
    });
  }

  public reset(): void {
    this.client.flushall();
  }

}

export default RedisCache;
