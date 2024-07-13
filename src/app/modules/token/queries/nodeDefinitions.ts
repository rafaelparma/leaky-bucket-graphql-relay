import {
    GraphQLObjectType,
    GraphQLString,    
    GraphQLBoolean,
  } from 'graphql';
  
  import {
    nodeDefinitions,
    fromGlobalId,
    globalIdField,
    connectionDefinitions,
  } from 'graphql-relay';
  import { TokenModel } from '../../../database/schemas/token';
  
  
  const { nodeInterface, nodeField } = nodeDefinitions(
    (globalId: string) => {
      const { type, id } = fromGlobalId(globalId);
      if (type === 'Token') {
        return TokenModel.findById(id).exec();
      }
      return null;
    },
    (obj: any) => {
      if (obj instanceof TokenModel) {
        return tokenType;
      }
      return null;
    }
  );
  
   
  const tokenType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Token',
    fields: () => ({
      id: globalIdField('Token'),
      token: { type: GraphQLString },
      username: { type: GraphQLString },
      pixkey_type: { type: GraphQLString },
      pixkey: { type: GraphQLString },
      pixkey_valid: { type: GraphQLBoolean },    
      used: { type: GraphQLBoolean },
      expired: { type: GraphQLBoolean },
      createdAt: { 
        type: GraphQLString,
        resolve: (tokens) => new Date(tokens.createdAt).toISOString()
      },
      updatedAt: { 
        type: GraphQLString,
        resolve: (tokens) => new Date(tokens.updatedAt).toISOString()
      }
    }),
    interfaces: [nodeInterface]
  });
  
  const { connectionType: tokenConnection } = connectionDefinitions({
    name: 'Token',
    nodeType: tokenType
  });

  export { nodeInterface, nodeField, tokenType, tokenConnection };