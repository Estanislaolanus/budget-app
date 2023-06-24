import mongoose from 'mongoose';

const AmountSchema = new mongoose.Schema({
    amountArray: [
        {
            id: {type: String, required: true},
            category: {type: String, required: true, max: 100},
            amount: {type: Number, required: true},
            type: {type: String, required: true},
            timestamp: {type: Number, required: true}
        }
    ],
    userId: {type: String, required: true}
});

export default AmountSchema;