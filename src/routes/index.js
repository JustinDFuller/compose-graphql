export default ({ dependencies /* , models */ }) => ({
  routes: [{
    method: 'get',
    url: '/graphiql',
    callback: dependencies.ApolloServer.graphiqlExpress({ endpointURL: '/graphql' }),
  }],
});
