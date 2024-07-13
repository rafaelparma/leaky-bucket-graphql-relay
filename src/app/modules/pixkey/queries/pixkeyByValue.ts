import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from 'graphql';
import { pixkeyType } from '../queries/nodeDefinitions';
import { PixKeyModel } from '../../../database/schemas/pixkey';

const pixkeyByValueQuery: GraphQLFieldConfig<any, any> = {
  type: pixkeyType,
  args: { pixkey: { type: GraphQLNonNull(GraphQLString) } },
  description: 'Get a PixKey by value',
  resolve: async (parent, args) => {
    const pixkeys = await PixKeyModel.findOne({ pixkey: args.pixkey }).exec();
    return pixkeys;
  }
};

export { pixkeyByValueQuery };
