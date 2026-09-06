import './config/env.js'
import app from './app.js'
import { connetDB } from './db/connectdb.js';
const PORT = process.env.PORT;

connetDB()
    .then(() => {
        console.log("Connected to DB successfully");
        app.listen(PORT, () => {
            console.log(`Example app listening on port http://localhost:${PORT}/`)
        })
    })
    .catch(() => {
        console.error("MongoDB Connection error ", error);
        process.exit(1);
    })
