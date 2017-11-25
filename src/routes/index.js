export default ({ dependencies, schema /* , models */ }) => ({
  routes: [{
    method: 'get',
    url: '/graphiql',
    callback: dependencies.ApolloServer.graphiqlExpress({ endpointURL: '/graphql' }),
  },
  {
    method: 'use',
    url: '/graphql',
    callback: dependencies.ApolloServer.graphqlExpress({ schema }),
  },
  ],
});
