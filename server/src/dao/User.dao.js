import MongoDB from '../database/MongoDB.database.js'
import UserSchema from '../models/User.model.js';

export default class User extends MongoDB {
    constructor() {
        super('user', UserSchema);
    }
    async getUserByEmail(email) {
        try {
            return await this.collection.findOne({ email: email });
        } catch (err) {
            console.error(`Dao error: ${err}`);
        }
    }
    async getUserByToken(token) {
        try {
            return await this.collection.findOne({ token: token });
        } catch (err) {
            console.error(`Dao error: ${err}`);
        }
    }
}