import "dotenv/config";

export default class Config {
    constructor() {
        this.PORT = process.env.PORT || 8080;
        this.URI = process.env.URI;
        this.MONGO_ATLAS_URI = process.env.MONGO_ATLAS_URI;
        this.SESSION_SECRET = process.env.SESSION_SECRET;
        this.CLIENT_URL = process.env.CLIENT_URL;
        this.SECRET_JWT_TOKEN = process.env.SECRET_JWT_TOKEN;
        this.AUTH_EMAIL = process.env.AUTH_EMAIL;
        this.AUTH_PASSWORD = process.env.AUTH_PASSWORD;
    }
}