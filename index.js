const express = require("express");
const connectDB = require("./db");
const authRouter = require("./Routes/auth");

const PORT = 3000;
const app = express(); 
app.use(express.json());

(async () => {
  const app = await connectDB();

  app.get("/", (req, res) => {
    res.send("Fetching Data From  API");
  });

  
  app.use('/api/auth', authRouter);

  app.listen(PORT, () => {
    console.log(`Server Working on Port:${PORT}`);
  });
})();
