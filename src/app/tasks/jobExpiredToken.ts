import cron from 'node-cron';
import jwt from 'jsonwebtoken';
import { UserModel } from '../database/schemas/user';
import { TokenModel } from '../database/schemas/token';
import connectMongoDB from '../database/index'

connectMongoDB()

/* This job runs every minute to check for expired and unused tokens. If any tokens are found, 
it sets the expired field to true and adds one token to the user who created the token. */
export const jobExpiredToken = cron.schedule('* * * * *', async () => {
    const now = new Date();
    console.log(`JobExpiredToken running every minute at ${now}`); 
    const oneMinuteAgo = new Date(now.getTime() - 60 * 1000);
    const tokens = await TokenModel.find({ createdAt: { $lt: oneMinuteAgo }, used: false, expired: false }).exec(); 
    if (tokens) {
        for (const token of tokens) {
            try {
                const decoded = jwt.decode(token.token) as { exp?: number };
                if (decoded && decoded.exp) {
                    const now_timestamp = Math.floor(Date.now() / 1000);
                    if (decoded.exp < now_timestamp) {                    
                        token.expired = true;
                        await token.save(); 
                        const user = await UserModel.findOne({ username: token.username, tokens: { $lt: 10 } }).exec(); 
                        if (user) {
                            user.tokens += 1;
                            await user.save();    
                        }
                    }                      
                }
            } catch (error) {
                console.log(error);
            }
        }        
    }          

});