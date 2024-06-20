const express = require("express");
const cors = require("cors");
const mainRouter = require("./routes/index");

const app = express();
app.use(express.json());

app.use(cors()); //since our backend and frontend have different routes

app.use("/api/v1", mainRouter);

app.listen(3000);
