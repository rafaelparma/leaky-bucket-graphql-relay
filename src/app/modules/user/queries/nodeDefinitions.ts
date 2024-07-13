import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
  } from 'graphql';
  import {
    nodeDefinitions,
    fromGlobalId,
    globalIdField,
    connectionDefinitions
  } from 'graphql-relay';
  import { UserModel } from '../../../database/schemas/user';
  
  
  const { nodeInterface, nodeField } = nodeDefinitions(
    (globalId: string) => {
      const { type, id } = fromGlobalId(globalId);
      if (type === 'User') {
        return UserModel.findById(id).exec();
      }
      return null;
    },
    (obj: any) => {
      if (obj instanceof UserModel) {
        return userType;
      }
      return null;
    }
  );

   
  const userType: GraphQLObjectType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
      id: globalIdField('User'),
      username: { type: GraphQLString },
      tokens: { type: GraphQLInt },
      createdAt: { 
        type: GraphQLString,
        resolve: (users) => new Date(users.createdAt).toISOString()
      },
      updatedAt: { 
        type: GraphQLString,
        resolve: (users) => new Date(users.updatedAt).toISOString()
      }
    }),
    interfaces: [nodeInterface]
  });

  const { connectionType: userConnection } = connectionDefinitions({
    name: 'User',
    nodeType: userType
  });
  
  export { nodeInterface, nodeField, userType, userConnection };