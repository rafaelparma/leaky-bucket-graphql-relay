import {
    GraphQLString,
    GraphQLNonNull,
    GraphQLFieldConfig,
  } from 'graphql';
  import { connectionFromArray } from 'graphql-relay';
  import { TokenModel } from '../../../database/schemas/token';
  import { tokenConnection } from './nodeDefinitions'
  
  
  const tokensByUsernameQuery: GraphQLFieldConfig<any, any> = {
    type: tokenConnection,
    args: { username: { type: GraphQLNonNull(GraphQLString) } },
    description: 'Get all Tokens By an User',
    resolve: async (parent, args) => {
        const tokens = await TokenModel.find({ username: args.username}).exec();
        return connectionFromArray(tokens, args);
    }    
  };
  
  export { tokensByUsernameQuery };  