export default ({ dependencies, models }) => {
  const {
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLEnumType,
    GraphQLList,
  } = dependencies.graphql;

  const { fp } = dependencies;

  const graphqlSequelizeTypeMap = {
    INTEGER: GraphQLInt,
    TINYINT: GraphQLInt,
    SMALLINT: GraphQLInt,
    MEDIUMINT: GraphQLInt,
    BIGINT: GraphQLInt,
    FLOAT: GraphQLFloat,
    DOUBLE: GraphQLFloat,
    DECIMAL: GraphQLFloat,
    REAL: GraphQLFloat,
    BOOLEAN: GraphQLBoolean,
    CHAR: GraphQLString,
    TEXT: GraphQLString,
    STRING: GraphQLString,
    DATE: GraphQLString,
    DATEONLY: GraphQLString,
    TIME: GraphQLString,
    NOW: GraphQLString,
    UUID: GraphQLString,
    UUIDV1: GraphQLString,
    UUIDV4: GraphQLString,
    ENUM: GraphQLEnumType,
    ARRAY: GraphQLList,
  };

  const rawAttributes = fp.compose(
    fp.mapValues(fp.mapValues((attribute) => {
      const type = graphqlSequelizeTypeMap[attribute.type.constructor.name];
      return {
        type,
        required: Boolean(attribute.allowNull),
      };
    })),
    fp.mapValues('rawAttributes'),
  )(models);

  return {
    rawAttributes,
  };
};
