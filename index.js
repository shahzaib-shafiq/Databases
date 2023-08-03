const express = require("express");

const connectToMongo = require('./db');

connectToMongo();
const app = express();

const port = 3001;

app.use('/api/auth',require('./Routes/auth'));
app.use('/api/notes',require('./Routes/notes'));

app.listen(port, () => {
    console.log(`Connected on : ${port}`);
});
