import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    amount: { type: Number, required: true },
    category: { type: String, enum: ['transportation', 'groceries', 'personalCare', 'debtPayents', 'taxes', 'entertainment', 'education', 'insurance', 'housing', 'other'], required: true },
    description: { type: String },
    type: { type: String, enum: ['fixed', 'regular'], required: true },
    timestamp: { type: Date, default: Date.now(), required: true },
    updated_at: { type: Date }
});

export default ExpenseSchema;