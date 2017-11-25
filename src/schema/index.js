export default ({ dependencies, models }) => {
  const {
    makeExecutableSchema,
    // addMockFunctionsToSchema,
  } = dependencies.GraphqlTools;

  const resolvers = {
    Query: {
      user(root, args, ...rest) {
        console.log(...rest, root, args);
        return models.User.findOne({
          where: { ...args },
        });
      },
    },
  };

  const typeDefs = `
    type User {
      username: String
      email: String
      password: String
    }

    type Query {
      user(username: String, email: String): User
    }
  `;

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // addMockFunctionsToSchema({ schema });

  return {
    schema,
  };
};
