
import MongoDB from '../database/MongoDB.database.js';
import AmountSchema from '../models/Amount.model.js';

export default class Amount extends MongoDB {
    constructor() {
        super('amount', AmountSchema);
    }
    async getByUserId(id) {
        try {
            return await this.collection.findOne({userId: id});
        } catch (err) {
            console.error(`Dao error: ${err}`);
        }
    }
}
