import denv from 'dotenv';

const dotenv = denv.config();


const config = {
    isAdmin: true,
    PERSISTENCE: process.env.PERSISTENCE,
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || 8080
};

export default config;