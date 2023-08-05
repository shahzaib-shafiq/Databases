const express = require("express");
const connectDB = require("./db"); // Make sure the file path to db.js is correct
const authRouter = require("./Routes/auth");



const PORT = 3000;
const app = express();
app.use(express.json());

(async () => {
  await connectDB();

  app.get("/", (req, res) => {
    res.send("Fetching Data From API");
  });

  app.use('/api/auth', authRouter);

  app.listen(PORT, () => {
    console.log(`Server Working on Port:${PORT}`);
  });
})();
