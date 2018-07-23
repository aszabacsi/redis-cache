import RedisCache from './Cache';

const cache = new RedisCache('redis://127.0.0.1:6379');

const entry = {
  key: 'key',
  value: {
    a: 'a',
    b: 'b'
  }
}

cache.set(entry.key, entry.value);
cache.get(entry.key);