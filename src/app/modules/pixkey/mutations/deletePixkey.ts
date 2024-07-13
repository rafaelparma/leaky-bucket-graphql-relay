import {
    GraphQLID,
    GraphQLNonNull
  } from 'graphql';
  import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';
  import { PixKeyModel } from '../../../database/schemas/pixkey';
  
  const deletePixKeyMutation = mutationWithClientMutationId({
    name: 'DeletePixKey',
    description: 'Delete a PixKey',
    inputFields: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    outputFields: {
      deletedPixKeyId: {
        type: GraphQLID,
        resolve: (payload) => payload.deletedPixKeyId
      }
    },
    mutateAndGetPayload: async (args) => {
      const { id } = args;
      const pixkeyId = fromGlobalId(id).id;
  
      const pixkey = await PixKeyModel.findByIdAndDelete(pixkeyId).exec();
      if (!pixkey) {
        throw new Error('Pixkey ID not found');
      }
      return { deletedPixKeyId: id };
    }
  });
  
  export { deletePixKeyMutation };
  