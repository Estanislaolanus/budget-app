import mongoose from "mongoose";
import Config from '../config/config.js';
const { MONGO_ATLAS_URI } = new Config();


export default class MongoDB {
    constructor(collectionName, schema) {
        this.collection = mongoose.model(collectionName, schema);
        this.connect();
    }
    async connect() {
        try {
            mongoose.connect(MONGO_ATLAS_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 5000
            });
        } catch (err) {
            console.error(`MongoDB error: ${err}`);
        }
    }
    /* CREATE */

    async save(object) {
        try {
            return await this.collection.create(object);
        } catch (err) {
            console.error(`MongoDB error: ${err}`);
        }
    }

    /* READ */

    async getAll() {
        try {
            return await this.collection.find({});
        } catch (err) {
            console.error(`MongoDB error: ${err}`);
        }
    }
    async getById(id) {
        try {
            return await this.collection.findOne({ _id: id });
        } catch (err) {
            console.error(`MongoDB error: ${err}`);
        }
    }

    /* UPDATE */

    async update(id, object) {
        try {
            await this.collection.updateOne({ _id: id }, { $set: object });
        } catch (err) {
            console.error(`MongoDB error: ${err}`);
        }
    }

    /* DELETE */
    async deleteById(id) {
        try {
            return await this.collection.deleteOne({ _id: id });
        } catch (err) {
            console.error(`MongoDB error: ${err}`);
        }
    }
}
