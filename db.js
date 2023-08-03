const mongoose = require("mongoose");

const URL = "mongodb://127.0.0.1:27017/test1";

const connection = async () => {
    try {
        await mongoose.connect(URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Connection Error:", error.message);
    }
};

module.exports = connection;
