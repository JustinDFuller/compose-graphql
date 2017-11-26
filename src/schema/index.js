export default ({ dependencies, models }) => {
  const {
    makeExecutableSchema,
    // addMockFunctionsToSchema,
  } = dependencies.GraphqlTools;
  const { fp, _ } = dependencies;

  const getLength = fp.get('length');

  const getAttributeNames = fp.compose(
    attributes => (getLength(attributes) ? attributes : undefined),
    fp.map('name.value'),
    fp.get('fieldNodes[0].selectionSet.selections'),
  );


  const Query = {};

  _.forEach(models, (model, key) => {
    Query[`findOne${key}`] = (root, where, source, ast) => {
      const attributes = getAttributeNames(ast);

      return model.findOne({
        where,
        attributes,
      });
    };

    Query[`find${key}ById`] = (root, where, source, ast) => {
      const attributes = getAttributeNames(ast);

      return model.findById(where.id, {
        attributes,
      });
    };
  });

  console.log(Query);

  const Mutation = {};

  _.forEach(models, (model, key) => {
    Mutation[`upsert${key}`] = async (root, where, ...rest) => {
      await model.upsert(where);
      return model.findOne(root, where, ...rest);
    };

    Mutation[`findOrCreate${key}`] = async (root, where, source, ast) => {
      const attributes = getAttributeNames(ast);
      return model.findOrCreate({
        where,
        defaults: where,
        attributes: attributes && attributes.filter(a => a !== 'created'),
      }).spread((res, created) => ({
        ...res.get({
          plain: true,
        }),
        created,
      }));
    };

    Mutation[`create${key}`] = (root, where) => model.create(where);
  });

  console.log(Mutation);

  const resolvers = {
    Query,
    Mutation,
  };

  const typeDefs = `
    type User {
      username: String
      email: String
      password: String
      created: String
    }

    type Query {
      findOneUser(id: ID!, username: String, email: String): User
      findUserById(id: ID!): User
    }

    type Mutation {
      upsertUser(username: String!, email: String): User
      findOrCreateUser(username: String!, email: String): User
      createUser(username: String!, email: String): User
    }
  `;

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // addMockFunctionsToSchema({ schema });

  return {
    schema,
  };
};
