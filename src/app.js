const express = require("express");
const routes = require("./routes/index_router");
const passport = require("passport");
var cors = require("cors");

// config files
require("dotenv").config();
require("./config/passport_config");

//Set up mongoose connection
const mongoose = require("mongoose");
const mongoDB = process.env.DB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();

// Passport init
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use("/users", routes.usersRouter);
app.use("/posts", routes.postsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`);
});
