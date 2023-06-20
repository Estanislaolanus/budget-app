import "dotenv/config";

export default class Config {
    constructor(){
        this.PORT = process.env.PORT || 8080;
        this.URI = process.env.URI;
        this.MONGO_ATLAS_URI = process.env.MONGO_ATLAS_URI;
        this.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
        this.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
        this.COOKIE_KEY = process.env.COOKIE_KEY;
        this.CLIENT_URL = process.env.CLIENT_URL;
    }
}