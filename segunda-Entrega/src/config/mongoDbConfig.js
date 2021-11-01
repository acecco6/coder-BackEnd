const localUrl = process.env.MONGO_LOCAL_URL;
const atlasUrl = process.env.MONGO_ATLAS_URL;

const MongoDbConfig = {
    localUrl,
    atlasUrl,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 1000
    },
};

export default MongoDbConfig;
