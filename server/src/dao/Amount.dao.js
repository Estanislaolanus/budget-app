
import MongoDB from '../database/MongoDB.database.js';
import AmountSchema from '../models/Amount.model.js';

export default class Amount extends MongoDB {
    constructor() {
        super('amount', AmountSchema);
    }

    async getAmountByMonthAndYear(id, month, year) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 1)
        return this.collection.findOne({
            userId: id,
            "amountArray.timestamp": {
                $gte: startDate,
                $lt: endDate
            }
        }, {
            "amountArray": {
                $filter: {
                    input: "$amountArray",
                    as: "item",
                    cond: {
                        $and: [
                            { $gte: ["$$item.timestamp", startDate] },
                            { $lt: ["$$item.timestamp", endDate] }
                        ]
                    }
                }
            }
        });
    }
    async getByUserId(id) {
        try {
            return await this.collection.findOne({ userId: id });
        } catch (err) {
            console.error(`Dao error: ${err}`);
        }
    }
    async updateAmount(amountId, objectId, props) {
        try {
            let operation = {}
            Object.entries(props).forEach(([key, value]) => {
                operation = { ...operation, [`amountArray.$.${key}`]: value };
            });
            const updateOperation = { $set: operation };

            return await this.collection.updateOne(
                { _id: amountId, "amountArray.id": objectId },
                updateOperation
            );
        } catch (err) {
            console.error(`Dao error: ${err}`);
        }
    }
}
