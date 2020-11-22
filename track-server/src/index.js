require("./models/User");
require("./models/Track");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");

const requireAuth = require("./middlewares/requireAuth");

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = "mongodb+srv://admin:passwordpassword@cluster0.cg5dt.mongodb.net/Cluster0?retryWrites=true&w=majority";

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("CONNECTED TO DB");
});

mongoose.connection.on("error", (err) => {
  console.log("Error connecting TO DB", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(req.user);
});

app.listen("3000", () => {
  console.log("SERVER RUNNING");
});
