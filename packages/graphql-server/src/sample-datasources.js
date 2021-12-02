import {RESTDataSource} from "apollo-datasource-rest"

export class MySampteDatasource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://mapi.com/';
  }

  async getById(id) {
    return this.get(`my-entity/${id}`);
  }

  // force 1 day ttl for all requests
  cacheOptionsFor() {
    return { ttl: 60 * 60 * 24 }
  }
}
