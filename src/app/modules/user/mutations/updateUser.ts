import { GraphQLString, GraphQLID, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';
import { UserModel } from '../../../database/schemas/user';
import { userType } from '../queries/nodeDefinitions';
import bcrypt from 'bcryptjs';
  

const updateUserMutation = mutationWithClientMutationId({
    name: 'UpdateUser',
    description: 'Update an User',
    inputFields: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      password: { type: new GraphQLNonNull(GraphQLString) }
    },
    outputFields: {
      user: {
        type: userType,
        resolve: (payload) => payload.user
      }
    },
    mutateAndGetPayload: async (args) => {
      const { id, password } = args;
      const userId = fromGlobalId(id).id;
      const user = await UserModel.findById(userId).exec();
      if (!user) {
        throw new Error('User not found');
      }
      const passwordbcrypt = await bcrypt.hash(args.password, 10);
      user.password = passwordbcrypt;      
      await user.save();
      return { user };
    }
});

export { updateUserMutation };