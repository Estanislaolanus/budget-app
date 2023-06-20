import MongoDBContainer from '../database/MongoDB.database.js';
import UserSchema from '../models/User.model.js';
class User extends MongoDBContainer {
    constructor() {
        super('user', UserSchema);
    }
    async getUserByEmail(email) {
        try {
            return await this.collection.findOne({email: email});
        } catch (err) {
            console.error(`Dao error: ${err}`);
        }
    }
}
export default User;