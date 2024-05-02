import mongoose from 'mongoose';

const IncomeSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    amount: { type: Number, required: true },
    source: { type: String, required: true },
    description: { type: String },
    type: { type: String, enum: ['fixed', 'regular'], required: true },
    timestamp: { type: Date, default: Date.now(), required: true },
    updated_at: { type: Date, default: Date.now() }
});

export default IncomeSchema;