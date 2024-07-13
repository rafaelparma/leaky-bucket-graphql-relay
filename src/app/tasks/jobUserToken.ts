import cron from 'node-cron';
import { UserModel } from '../database/schemas/user';
import connectMongoDB from '../database/index'

connectMongoDB()

/* This job runs every hour and adds one token to each user with fewer than 10 available tokens */
export const jobUserToken = cron.schedule('0 * * * *', async () => {
    const now = new Date();
    console.log(`jobUserToken running every hour at ${now}`);     
    const users = await UserModel.find({ tokens: { $lt: 10 } }).exec(); 
    if (users) {
        for (const user of users) {
            try {
                user.tokens += 1;
                await user.save();    
            } catch (error) {
                console.log(error);
            }
        }        
    }          
});
