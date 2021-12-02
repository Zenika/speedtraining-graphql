import {ApolloServer, gql} from "apollo-server";
import {ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core";
import {MySampteDatasource} from "./sample-datasources.js";

const schema = gql``

const server = new ApolloServer({
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  resolvers: {},
  schema: schema,
  dataSources: {
    sample: new MySampteDatasource()
  }
}); // TODO



server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
