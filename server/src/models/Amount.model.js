import mongoose from 'mongoose';

const AmountSchema = new mongoose.Schema({
    amountArray: [
        {
            amount: {type: Number, required: true}, 
            category: {type: String, required: true}, 
            description: {type: String, required: true}, 
            type: {type: String, required: true},
            timestamp: {type: Date, default: Date.now, required: true}, 
            id: {type: String, required: true}
        }
    ],
    userId: {type: String, required: true}
});

export default AmountSchema;