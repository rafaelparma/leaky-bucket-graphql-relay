import { GraphQLFieldConfig, GraphQLString, GraphQLNonNull } from 'graphql';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserModel } from '../../../database/schemas/user';
import { TokenModel } from '../../../database/schemas/token';
import { appConfig } from '../../../configs/index'
     
const authQuery:  GraphQLFieldConfig<any, any> = {
  type: GraphQLString,
  args: { 
      username: { type: GraphQLNonNull(GraphQLString) },
      password: { type: GraphQLNonNull(GraphQLString) },
    },
  description: 'User Authentication',
  resolve: async (parent, args) => {
    try {
      const user = await UserModel.findOne({username: args.username}).exec(); 
      if (!user) {
        return 'Invalid credentials';
      }
      
      const isMatch = await bcrypt.compare(args.password, user.password);
      if (!isMatch) {
        return 'Invalid credentials';
      }
      
      if (user.tokens <= 0) {
        return (
          'Your bucket is currently empty. ' +              
          'If you haven\'t used the tokens you generated earlier, please use them now. ' +
          'Otherwise, please wait for the bucket to be refilled before generating more tokens.'
        );
      }

      user.tokens -= 1;
      await user.save();    

      const token_jwt = jwt.sign({ username: args.username }, appConfig.JWT_SECRET as jwt.Secret, { expiresIn: '1m' });
      const token = new TokenModel({
        token: token_jwt,  
        username: user.username
      });
      await token.save();

      return `Bearer ${token_jwt}`; 
        
    } catch (error) {
      throw new Error(error as string);
    }

  }
}

export { authQuery };
  