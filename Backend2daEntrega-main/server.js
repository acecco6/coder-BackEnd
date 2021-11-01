import app from './src/app.js';
import DbConnection from './src/db/dbConnection.js';
const db = new DbConnection(process.env.PERSISTENCE);
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    db.instance
        .initialize()
        .then(response => console.log('Connected...'))
        .catch(e => console.log(e.message))
})

export default db.instance;

