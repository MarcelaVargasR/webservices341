const express = require("express");
const bodyParser = require("body-parser");

const mongodb = require("./data/database");
const app = express();


// const lesson1controller = require("./controllers/lesson1");

// app.get("/", lesson1controller.mauriroute);

// app.get("/", (req, res) => {
//   res.send("hello titi");
// });

const port = 3000;
app.use(bodyParser.json())

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, x-Request-with, Content-Type, Accept, Z-key');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(process.env.port || 3000);
    console.log("DataBase is listening and node running on port" + (process.env.port || 3000));
  }
});
