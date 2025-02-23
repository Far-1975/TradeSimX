const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
