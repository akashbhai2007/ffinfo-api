const express = require("express");
const cors = require("cors");
const app = express();
const playerRoute = require("./routes/player");

app.use(cors());
app.use(express.json());

app.use("/api/player", playerRoute);

app.get("/", (req, res) => res.send("FF API Server is Running ✅"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`FF API running on port ${PORT}`));
