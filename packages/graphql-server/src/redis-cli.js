import { createClient } from 'redis';

const client = createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

const promiseConnection = client.connect();

export const getValue = async (key) => {
  await promiseConnection;
  return client.get(key);
};

export const setValue = async (key, value) => {
  await promiseConnection;
  return client.set(key, value);
};
