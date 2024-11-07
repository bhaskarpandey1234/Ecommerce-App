const { GraphQLObjectType, GraphQLID, GraphQLFloat, GraphQLString, GraphQLList } = require('graphql');
const ProductType = require('./ProductType');

const OrderType = new GraphQLObjectType({
  name: 'Order',
  fields: () => ({
    id: { type: GraphQLID },
    user: { type: GraphQLID },
    products: { type: new GraphQLList(ProductType) },
    totalAmount: { type: GraphQLFloat },
    status: { type: GraphQLString },
  }),
});

module.exports = OrderType;
