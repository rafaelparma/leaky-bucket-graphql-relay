import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLFieldConfigMap
  } from 'graphql';
  
  import { nodeField, nodeInterface } from './queries/nodeDefinitions';
  import { pixkeysQuery } from './queries/pixkeys';
  import { pixkeyByIdQuery } from './queries/pixkeyById';
  import { pixkeyByValueQuery } from './queries/pixkeyByValue';
  import {  pixkeyVerificationQuery } from './queries/pixkeyVerification';
  import { createPixKeyMutation } from './mutations/createPixkey';
  import { deletePixKeyMutation } from './mutations/deletePixkey';

  
  const queryType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Query',
    fields: (): GraphQLFieldConfigMap<any, any> => ({
      node: nodeField,
      pixkeys: pixkeysQuery,
      pixkeyById: pixkeyByIdQuery,
      pixkeyByValue: pixkeyByValueQuery,
      pixkeyVerification: pixkeyVerificationQuery,
    })
  });
  
  const mutationType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Mutation',
    fields: (): GraphQLFieldConfigMap<any, any> => ({
      createPixKey: createPixKeyMutation,
      deletePixKey: deletePixKeyMutation
    })
  });
  
  const schema: GraphQLSchema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType,
    types: [nodeInterface]
  });
  
  export { schema };
  