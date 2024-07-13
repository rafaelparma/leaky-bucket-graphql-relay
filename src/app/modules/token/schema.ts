import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLFieldConfigMap
  } from 'graphql';  
  import { nodeField, nodeInterface } from './queries/nodeDefinitions';
  import { tokensByUsernameQuery } from './queries/tokensByUsername';
  import { tokenByIdQuery } from './queries/tokenById';
  
  const queryType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Query',
    fields: (): GraphQLFieldConfigMap<any, any> => ({
      node: nodeField,
      tokensByUsername: tokensByUsernameQuery,
      tokenById: tokenByIdQuery,
    })
  });
  
const schema: GraphQLSchema = new GraphQLSchema({
    query: queryType,
    types: [nodeInterface]
  });
  
  export { schema };
  