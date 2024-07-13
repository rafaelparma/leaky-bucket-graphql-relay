import { GraphQLFieldConfig, GraphQLID, GraphQLNonNull } from 'graphql';
import { fromGlobalId } from 'graphql-relay';
import { userType } from '../queries/nodeDefinitions';
import { UserModel } from '../../../database/schemas/user';

const userByIdQuery: GraphQLFieldConfig<any, any> = {
    type: userType,
    args: { id: { type: GraphQLNonNull(GraphQLID) } },
    description: 'Get an User By ID',
    resolve: (parent, args) => UserModel.findById(fromGlobalId(args.id).id).exec()
};

export { userByIdQuery };