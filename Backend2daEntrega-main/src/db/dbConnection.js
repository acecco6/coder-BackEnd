import config from '../config/config.js';
import FileSystem from './fileSystemClass.js';
import Firebase from './firebaseClass.js';
import MongoDbaaS from './mongodbClass.js';
import MongoDb from './mongodbClass.js';
import Sql from './sqlClass.js';
import Sqlite3 from './sqlite3Class.js';
import mongoDbConfig from '../config/mongoDbConfig.js';
import mySqlOptions from '../config/mySqlOptions.js';
import sqliteOptions from '../config/sqliteOptions.js';

function DbConnection(id) {
    this.instance =
        id == 1
            ? new FileSystem()
            : id == 2
                ? new Sql(mySqlOptions)
                : id == 3
                    ? new MongoDb(mongoDbConfig.localUrl, mongoDbConfig.options)
                    : id == 4
                        ? new MongoDb(mongoDbConfig.atlasUrl, mongoDbConfig.options)
                        : id == 5
                            ? new Sqlite3(sqliteOptions)
                            : id == 6
                                ? new Firebase()
                                : null;
}

export default DbConnection;

