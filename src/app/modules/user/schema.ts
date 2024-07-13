import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLFieldConfigMap
  } from 'graphql';
  
  import { nodeField, nodeInterface } from './queries/nodeDefinitions';
  import { usersQuery } from './queries/users';
  import { userByIdQuery } from './queries/userById';
  import { createUserMutation } from './mutations/createUser';
  import { updateUserMutation } from './mutations/updateUser';
  import { deleteUserMutation } from './mutations/deleteUser';
  
  const queryType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Query',
    fields: (): GraphQLFieldConfigMap<any, any> => ({
      node: nodeField,
      users: usersQuery,
      userById: userByIdQuery,
    })
  });
  
  const mutationType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Mutation',
    fields: (): GraphQLFieldConfigMap<any, any> => ({
      createUser: createUserMutation,
      updateUser: updateUserMutation,
      deleteUser: deleteUserMutation
    })
  });
  
  const schema: GraphQLSchema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType,
    types: [nodeInterface]
  });
  
  export { schema };
  