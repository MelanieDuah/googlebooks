const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require('body-parser');
const cors = require('cors');

const UserController = require('./controller/googlecontroller');

const PORT = process.env.PORT || 3005;
const app = express();

if (process.env.NODE_ENV != 'production') {
  app.use(cors({
    origin: '*'
  }));
}

app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

connectMongoose();

const controller = new UserController(app);
controller.createRoutes();

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

async function connectMongoose() {
  try {
    await mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/googlebooksdb", {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
  } catch (error) {
    console.error("still can't connect to mongoose");

  }
}