const express = require("express");
const routes = require("./routes/index_router");
require("dotenv").config();

//Set up mongoose connection
const mongoose = require("mongoose");
const mongoDB = process.env.DB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api", routes.mainRouter);
app.use("/api/users", routes.usersRouter);
app.use("/api/posts", routes.postsRouter);
app.use("/api/comments", routes.commentsRouter);

app.listen(3000, () => {
  console.log("Now listening on port 3000");
});
