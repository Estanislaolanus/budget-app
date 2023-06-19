import mongoose from 'mongoose';

const UsersSchema = new mongoose.Schema({
    username: {type: String, required: true, max: 100},
    email: {type: String, required: true},
    password: {type: String, required: true}
});

export default UsersSchema;