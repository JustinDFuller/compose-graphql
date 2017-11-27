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
        raw: true,
      });
    };

    Query[`find${key}ById`] = (root, where, source, ast) => {
      const attributes = getAttributeNames(ast);

      return model.findById(where.id, {
        attributes,
        raw: true,
      });
    };

    Query[`findAll${key}s`] = (root, { offset, limit, ...where }, source, ast) => {
      const attributes = getAttributeNames(ast);

      return model.findAll({
        where,
        offset,
        limit,
        attributes,
        raw: true,
      });
    };

    Query[`findAndCountAll${key}s`] = (root, { offset, limit, ...where }, source, ast) => {
      const attributes = getRowsAttributeNames(ast);

      return model.findAndCountAll({
        where,
        offset,
        limit,
        attributes,
        raw: true,
      });
    };

    Query[`count${key}s`] = (root, where) => model.count({
      where,
    }).then(count => ({ count }));

    Query[`max${key}s`] = (root, { field, ...where }) => model.max(field, {
      where,
    });

    Query[`min${key}s`] = (root, { field, ...where }) => model.min(field, {
      where,
    });

    Query[`sum${key}s`] = (root, { field, ...where }) => model.sum(field, {
      where,
    });
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

  let typeDefs = `
    type Count {
      count: Int
    }

    type Max {
      max: Int
    }

    type Min {
      min: Int
    }

    type Sum {
      sum: Int
    }
  `;

  _.forEach(models, (value, key) => {
    console.dir(value.attributes);
    typeDefs += `
      type ${key} {
        id: String
        username: String
        email: String
        password: String
        created: String
      }

      type ${key}sWithCount {
        rows: [${key}] 
        count: Int
      }

      type Query {
        findOne${key}(id: ID!, username: String, email: String): ${key}
        find${key}ById(id: ID!): ${key}
        findAndCountAll${key}s(limit: Int, offset: Int, username: String): ${key}sWithCount 
        findAll${key}s(limit: Int, offset: Int, username: String): [${key}] 
        count${key}s(username: String): Count
        max${key}s(field: String): Max
        min${key}s(field: String): Min
        sum${key}s(field: String): Sum
      }

      type Mutation {
        upsert${key}(username: String!, email: String): ${key}
        findOrCreate${key}(username: String!, email: String): ${key}
        create${key}(username: String!, email: String): ${key}
      }
    `;
  });

  console.log(typeDefs);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // addMockFunctionsToSchema({ schema });

  return {
    schema,
  };
};
