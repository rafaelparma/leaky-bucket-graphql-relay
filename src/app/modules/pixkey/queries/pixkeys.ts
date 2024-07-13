
import { GraphQLFieldConfig } from 'graphql';
import { connectionArgs, connectionFromArray } from 'graphql-relay';
import { PixKeyModel } from '../../../database/schemas/pixkey';
import { pixkeyConnection } from './nodeDefinitions'

const pixkeysQuery: GraphQLFieldConfig<any, any> = {
  type: pixkeyConnection,
  args: connectionArgs,
  description: 'Get all PixKeys',
  resolve: async (parent, args) => {
    const pixkeys = await PixKeyModel.find().exec();
    return connectionFromArray(pixkeys, args);
  }
};

export { pixkeysQuery };
