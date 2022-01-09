var express = require("express");
var app = express();

//11.Use body-parser to Parse POST Requests
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

//1.Node Console
console.log("Hello World");

//2.Start an Express Server
// app.get("/", (req, res) => {
//   res.send("Hello Express");
// })

//3.Serve an HTML file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

//4.Serve Static Assets
app.use("/public", express.static(__dirname + "/public"));

//5.Serve JSON on a specific route
// app.get("/json", (req, res) => {
//   res.json({"message": "Hello json"})
// })

//6. Use the .env File
//const mySecret = process.env['MESSAGE_STYLE']
app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE == "uppercase") {
    res.json({ message: "HELLO JSON" });
  }
  res.json({ message: "Hello json" });
});

//7.Implement a Root-Level Request Logger Middleware
app.use(function (req, res, next) {
  var ourString = `${req.method} ${req.path} - ${req.ip}`;
  console.log(ourString);
  next();
});

//8.Chain Middleware to Create a Time Server
app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({ time: req.time });
  }
);

//9.Get Route Parameter Input from the Client
app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

//10.Get Query Parameter Input from the Client
app.get("/name", (req, res) => {
  res.json({ name: req.query.first + " " + req.query.last });
});

//12.Get Data from POST Requests
app.post("/name", (req, res) => {
  res.json({ name: `${req.body.first} ${req.body.last}` });
});

module.exports = app;
