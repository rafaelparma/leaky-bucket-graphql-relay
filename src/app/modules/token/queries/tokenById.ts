import {
    GraphQLID,
    GraphQLNonNull,
    GraphQLFieldConfig,
  } from 'graphql';
  import { fromGlobalId } from 'graphql-relay';
  import { TokenModel } from '../../../database/schemas/token';
  import { tokenType } from './nodeDefinitions'
  
  
  const tokenByIdQuery: GraphQLFieldConfig<any, any> = {
    type: tokenType,
    args: { id: { type: GraphQLNonNull(GraphQLID) } },
    description: 'Get an Token By ID',
    resolve: (parent, args) => TokenModel.findById(fromGlobalId(args.id).id).exec()    
  };
  
  export { tokenByIdQuery };  