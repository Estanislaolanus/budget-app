import "dotenv/config";

export default class Config {
    constructor(){
        this.PORT = process.env.PORT || 8080;
        this.URI = process.env.URI;
        this.MONGO_ATLAS_URI = process.env.MONGO_ATLAS_URI;
        this.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
        this.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
        this.SESSION_SECRET = process.env.SESSION_SECRET;
        this.CLIENT_URL = process.env.CLIENT_URL;
        this.GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;
        this.MONGO_STORE_URL = process.env.MONGO_STORE_URL;
        this.SECRET_JWT_TOKEN = process.env.SECRET_JWT_TOKEN;
    }
}