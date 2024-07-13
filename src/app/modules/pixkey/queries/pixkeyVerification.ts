import {
  GraphQLFieldConfig,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';
import jwt from 'jsonwebtoken';
import { PixKeyModel } from '../../../database/schemas/pixkey';
import { TokenModel } from '../../../database/schemas/token';
import { UserModel } from '../../../database/schemas/user';
import { appConfig } from '../../../configs/index'

const pixkeyVerificationQuery: GraphQLFieldConfig<any, any> = {
  type: GraphQLString,
    description: 'Verification pixkey by Type and Value',
    args: { 
      pixkey_type: { type: GraphQLNonNull(GraphQLString) },
      pixkey: { type: GraphQLNonNull(GraphQLString) } 
    },
    resolve: async (parent, args, context) => {
      
      try {
        const authHeader = context.headers.authorization;
        if (!authHeader) throw new Error('No token provided');

        const token_jwt = authHeader.split(' ')[1];
        const decoded = jwt.verify(token_jwt, appConfig.JWT_SECRET as jwt.Secret);
        if (!decoded) {
          throw new Error('Invalid token');
        }

        const token = await TokenModel.findOne({ token: token_jwt }).exec();            
        if (!token) {
          throw new Error('Token not found');
        }
        
        if (token.used || token.expired) {
          return 'This token has already been used/expired and cannot be accepted anymore';
        } 

        if (typeof decoded !== 'string' && decoded.username) {
          
          token.used = true;
          token.pixkey_type = args.pixkey_type;
          token.pixkey = args.pixkey;
          token.pixkey_valid = true;
          await token.save();

          const pixkey = await PixKeyModel.findOne({pixkey_type: args.pixkey_type, pixkey: args.pixkey}).exec();  
          if (!pixkey) {
            token.pixkey_valid = false;
            await token.save();                         
            return "Pixkey type and value are invalid!";
          }

          const user = await UserModel.findOne({ name: decoded.name }).exec();            
          if (!user) {
            throw new Error('Unable to restore user data from this token');
          }
          
          if (user.tokens < 10) {
            user.tokens += 1;
            await user.save();      
          }

          return "Type and pixkey validated successfully!";

        } else {
          throw new Error('Token validate error');
        }
          
      } catch (error) {
        throw new Error(error as string);
      }         
    }
};

export { pixkeyVerificationQuery };
