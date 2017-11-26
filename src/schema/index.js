export default ({ dependencies, models }) => {
  const {
    makeExecutableSchema,
    // addMockFunctionsToSchema,
  } = dependencies.GraphqlTools;
  const { fp, _ } = dependencies;

  const getLength = fp.get('length');
  const getNames = fp.map('name.value');
  const getFirstFieldNode = fp.get('fieldNodes[0]');
  const getSelections = fp.get('selectionSet.selections');
  const defaultToUndefined = attributes => (getLength(attributes) ? attributes : undefined);

  const getAttributeNames = fp.compose(
    defaultToUndefined,
    getNames,
    getSelections,
    getFirstFieldNode,
  );

  const getRowsAttributeNames = fp.compose(
    defaultToUndefined,
    getNames,
    getSelections,
    fp.head,
    fp.filter(selection => _.get(selection, 'name.value') === 'rows'),
    getSelections,
    getFirstFieldNode,
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

    Query[`findAndCountAll${key}s`] = (root, { offset, limit, ...where }, source, ast) => {
      const attributes = getRowsAttributeNames(ast);

      return model.findAndCountAll({
        where,
        offset,
        limit,
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

    type UserCount {
      rows: [User]
      count: Int
    }

    type Query {
      findOneUser(id: ID!, username: String, email: String): User
      findUserById(id: ID!): User
      findAndCountAllUsers(limit: Int, offset: Int, username: String): UserCount 
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
