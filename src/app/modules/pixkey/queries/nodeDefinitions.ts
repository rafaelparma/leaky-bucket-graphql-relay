import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import {
  nodeDefinitions,
  fromGlobalId,
  globalIdField,
  connectionDefinitions
} from 'graphql-relay';
import { PixKeyModel } from '../../../database/schemas/pixkey';

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId: string) => {
    const { type, id } = fromGlobalId(globalId);
    if (type === 'PixKey') {
      return PixKeyModel.findById(id).exec();
    }
    return null;
  },
  (obj: any) => {
    if (obj instanceof PixKeyModel) {
      return pixkeyType;
    }
    return null;
  }
);

const pixkeyType: GraphQLObjectType = new GraphQLObjectType({
  name: 'PixKey',
  fields: () => ({
    id: globalIdField('PixKey'),
    pixkey_type: { type: GraphQLString },
    pixkey: { type: GraphQLString },
    createdAt: { 
      type: GraphQLString,
      resolve: (pixkeys) => new Date(pixkeys.createdAt).toISOString()
    },
    updatedAt: { 
      type: GraphQLString,
      resolve: (pixkeys) => new Date(pixkeys.updatedAt).toISOString()
    }
  }),
  interfaces: [nodeInterface]
});

const { connectionType: pixkeyConnection } = connectionDefinitions({
  name: 'PixKey',
  nodeType: pixkeyType
});

export { nodeInterface, nodeField, pixkeyType, pixkeyConnection };
