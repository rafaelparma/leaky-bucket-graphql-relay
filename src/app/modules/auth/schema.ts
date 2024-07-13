import { GraphQLSchema, GraphQLObjectType, GraphQLFieldConfigMap } from 'graphql';
import { authQuery } from './queries/auth';
  
    const queryType: GraphQLObjectType = new GraphQLObjectType({
      name: 'Query',
      fields: (): GraphQLFieldConfigMap<any, any> => ({
        auth: authQuery,
      })
    });
    
    const schema: GraphQLSchema = new GraphQLSchema({
      query: queryType,
    });
    
    export { schema };
  