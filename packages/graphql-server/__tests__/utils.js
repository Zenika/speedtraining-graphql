import { execute, makePromise } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';

const server = 'localhost:4000';
const uri = `http://${server}/graphql`;

export const reqGql = async (gqlRequest, headers) => {
  const link = new HttpLink({ uri, fetch, headers });
  return makePromise(execute(link, gqlRequest));
};
