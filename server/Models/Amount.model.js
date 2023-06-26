import mongoose from 'mongoose';

const AmountSchema = new mongoose.Schema({
    amountArray: [
        
    ],
    userId: {type: String, required: true}
});

export default AmountSchema;