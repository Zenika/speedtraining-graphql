import {RESTDataSource} from "apollo-datasource-rest";
import {getValue, setValue} from "./redis-cli.js";

export class MySampteDatasource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://mapi.com/';
  }

  async getRedisCache(url) {
    const redisCache = await getValue(url);
    if (redisCache) {
      return JSON.parse(redisCache);
    }

    const response = await this.get(url);

    await setValue(url, JSON.stringify(response));

    return response;
  }

  async getById(id) {
    return this.getRedisCache(`my-entity/${id}`);
  }

}
