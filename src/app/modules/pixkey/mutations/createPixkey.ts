import {
    GraphQLString,
    GraphQLNonNull
  } from 'graphql';
  import { mutationWithClientMutationId } from 'graphql-relay';
  import { pixkeyType } from '../queries/nodeDefinitions';
  import { PixKeyModel, EnumPixKeyType } from '../../../database/schemas/pixkey';
  import { pixkeyValidate } from '../../../modules/pixkey/services/pixkeyValidate';
  
  const createPixKeyMutation = mutationWithClientMutationId({
    name: 'CreatePixKey',
    description: 'Create a new PixKey',
    inputFields: {
      pixkey_type: { type: new GraphQLNonNull(GraphQLString) },
      pixkey: { type: new GraphQLNonNull(GraphQLString) }
    },
    outputFields: {
      pixkey: {
        type: pixkeyType,
        resolve: (payload) => payload.pixkey
      }
    },
    mutateAndGetPayload: async (args) => {
      if (!Object.keys(EnumPixKeyType).includes(args.pixkey_type)) {
        throw new Error('The pix pixkey type is invalid');
      }
  
      const { pixkeyFormated, pixkeyValid } = await pixkeyValidate(args.pixkey_type, args.pixkey);
      if (!pixkeyValid) {
        throw new Error('The pixkey value is invalid for this pixkey type');
      }
  
      const pixkeyExist = await PixKeyModel.find({ pixkey: pixkeyFormated }).exec();
      if (pixkeyExist.length > 0) {
        throw new Error('The pix pixkey already exists');
      }
  
      const pixkey = new PixKeyModel({
        pixkey_type: args.pixkey_type,
        pixkey: pixkeyFormated
      });
      await pixkey.save();
  
      return { pixkey };
    }
  });
  
  export { createPixKeyMutation };
  