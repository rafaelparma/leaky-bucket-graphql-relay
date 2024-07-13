import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { UserModel } from '../../../database/schemas/user';
import { userType } from '../queries/nodeDefinitions';
import bcrypt from 'bcryptjs';
  

const createUserMutation = mutationWithClientMutationId({
    name: 'CreateUser',
    description: 'Create a new User',
    inputFields: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }      
    },
    outputFields: {
        user: {
            type: userType,
            resolve: (payload) => payload.user
        }
    },
    mutateAndGetPayload: async (args) => {
        const userCheck = await UserModel.find({ username: args.username }).exec();  
        if (userCheck.length > 0) {
            throw new Error('The username/password already exists');
        }          
            const password = await bcrypt.hash(args.password, 10);
            const user = new UserModel({
            username: args.username,
            password: password,
        });
        await user.save();

        return { user };
    }
});

export { createUserMutation };