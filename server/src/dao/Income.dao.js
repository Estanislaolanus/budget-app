
import MongoDB from '../database/MongoDB.database.js';
import IncomeSchema from '../models/Income.model.js';

export default class Income extends MongoDB {
    constructor() {
        super('income', IncomeSchema);
    }

    async getByMonthAndYear(id, month, year) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 1);
        return this.collection.find({
            user_id: id,
            timestamp: {
                $gte: startDate,
                $lt: endDate
            }
        }
        );
    }
    async getByUserId(id) {
        try {
            return await this.collection.find({ user_id: id });
        } catch (err) {
            console.error(`Dao error: ${err}`);
        }
    }
}
