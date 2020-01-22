const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const items = require("./routes/api/items");
const path = require("path");
const app = express();

//body parser MW
app.use(bodyParser.json());

// db import key
const db = require("./config/keys").mongoURI;

//connect to db
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to DB"))
  .catch(err => console.log(err));

// use routes
app.use("/api/items", items);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
// set port
const port = process.env.PORT || 5000;

//listen for start
app.listen(port, () => console.log(`Server started on port ${port}`));
