import { GraphQLID, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';
import { UserModel } from '../../../database/schemas/user';
  

const deleteUserMutation = mutationWithClientMutationId({
    name: 'DeleteUser',
    description: 'Delete an User',
    inputFields: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    outputFields: {
      deletedUserId: {
        type: GraphQLID,
        resolve: (payload) => payload.deletedUserId
      }
    },
    mutateAndGetPayload: async (args) => {
      const { id } = args;
      const userId = fromGlobalId(id).id;
      
      const user = await UserModel.findByIdAndDelete(userId).exec();
      if (!user) {
        throw new Error('User not found');
      }
      return { deletedUserId: id };
    }
});

export { deleteUserMutation };