import { GraphQLFieldConfig, GraphQLID, GraphQLNonNull } from 'graphql';
import { fromGlobalId } from 'graphql-relay';
import { pixkeyType } from '../queries/nodeDefinitions';
import { PixKeyModel } from '../../../database/schemas/pixkey';

const pixkeyByIdQuery: GraphQLFieldConfig<any, any> = {
  type: pixkeyType,
  args: { id: { type: GraphQLNonNull(GraphQLID) } },
  description: 'Get a PixKey by ID',
  resolve: (parent, args) => PixKeyModel.findById(fromGlobalId(args.id).id).exec()
};

export { pixkeyByIdQuery };
