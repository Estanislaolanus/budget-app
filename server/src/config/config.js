import "dotenv/config";

export default class Config {
    constructor() {
        this.PORT = process.env.PORT || 8080;
        this.URI = process.env.URI;
        this.MONGO_ATLAS_URI = process.env.MONGO_ATLAS_URI;
        this.SESSION_SECRET = process.env.SESSION_SECRET;
        this.SERVER_URL = process.env.SERVER_URL;
        this.CLIENT_URL = process.env.CLIENT_URL;
        this.SECRET_JWT_TOKEN = process.env.SECRET_JWT_TOKEN;
        this.AUTH_EMAIL = process.env.AUTH_EMAIL;
        this.AUTH_PASSWORD = process.env.AUTH_PASSWORD;
        this.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
        this.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
    }
}