const express = require("express");

const mongodb = require("./data/database");
const app = express();


// const lesson1controller = require("./controllers/lesson1");

// app.get("/", lesson1controller.mauriroute);

// app.get("/", (req, res) => {
//   res.send("hello titi");
// });

const port = 3000;

app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(process.env.port || 3000);
    console.log("DataBase is listening and node running on port" + (process.env.port || 3000));
  }
});
