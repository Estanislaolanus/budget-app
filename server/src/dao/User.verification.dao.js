import MongoDB from '../database/MongoDB.database.js'
import UsersVerificationSchema from '../models/User.verification.schema.js';

export default class UsersVerification extends MongoDB {
    constructor() {
        super('userVerification', UsersVerificationSchema);
    }

}