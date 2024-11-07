const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const { userQueries, userMutations } = require('../resolvers/authResolver');
const { productQueries, productMutations } = require('../resolvers/ProductResolver');
const { orderQueries, orderMutations } = require('../resolvers/orderResolver');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...userQueries,
    ...productQueries,
    ...orderQueries,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...userMutations,
    ...productMutations,
    ...orderMutations,
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
