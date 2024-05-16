import path from 'path';
import { configDotenv } from 'dotenv';

configDotenv();

const rootPath = __dirname;

const config = {
    rootPath,
    publicPath: path.join(rootPath, 'public'),
    mongoose: {
        db: 'mongodb://localhost/musicApi'
    },
    google: {
        clientId: process.env['GOOGLE_CLIENT_ID'],
        clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    }
};

export default config;