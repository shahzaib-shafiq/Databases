const express = require("express");
const router = require('../Models/Notes'); 

const app = express();
const port = 3000;

app.use('/api', router); 

app.listen(port, () => {
    console.log(`Connected on : ${port}`);
});
    