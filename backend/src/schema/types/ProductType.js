const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat, GraphQLBoolean } = require('graphql');

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLFloat },
    inStock: { type: GraphQLBoolean },
    imageUrl: { type: GraphQLString },
  }),
});

module.exports = ProductType;
