export default ({ dependencies, models }) => {
  const {
    makeExecutableSchema,
    // addMockFunctionsToSchema,
  } = dependencies.GraphqlTools;
  const { fp } = dependencies;

  const getAttributeNames = fp.compose(
    fp.map('name.value'),
    fp.get('fieldNodes[0].selectionSet.selections'),
  );

  const getLength = fp.get('length');

  const resolvers = {
    Query: {
      user(root, args, source, ast) {
        const attributes = getAttributeNames(ast);

        return models.User.findOne({
          where: { ...args },
          attributes: getLength(attributes) ? attributes : undefined,
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
