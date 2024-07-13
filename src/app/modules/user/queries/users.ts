import { GraphQLFieldConfig } from 'graphql';
import { connectionArgs, ConnectionArguments, connectionFromArray } from 'graphql-relay';
import { userConnection } from '../queries/nodeDefinitions';
import { UserModel } from '../../../database/schemas/user';

const usersQuery: GraphQLFieldConfig<any, any> = {
    type: userConnection,
    args: connectionArgs,
    description: 'Get all Users',
    resolve: async (parent, args: ConnectionArguments) => {
      const users = await UserModel.find().exec();
      return connectionFromArray(users, args);
    }
};

export { usersQuery };