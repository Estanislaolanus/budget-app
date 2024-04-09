import mongoose from 'mongoose';

const UsersVerificationSchema = new mongoose.Schema({
    userId: { type: String },
    uniqueString: { type: String },
    createdAt: { type: Date },
    expiresAt: { type: Date }
});

export default UsersVerificationSchema;