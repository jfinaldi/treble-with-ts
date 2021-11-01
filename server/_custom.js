const express = require("express");
const app = express();
const port = 5005;
app.use(express.static("public"));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get("/", (req, res) => {
  let img = `<img src="/img/cotton-candy.gif"/>`;
  let secret = `<a href="/.htaccess">secret</a>`;

  let html = `<!Doctype html><html><head><title>Sample</title></head>`;
  html += `<body><h1>Sample HTML</h1><main>${secret}</main></body></html>`;
  res.send(html);
});
app.get("/two", (req, res) => {
  var fs = require("fs");
  const path = require("path");
  var returnData = {};
  var filePath = path.join(__dirname, "drum_sound_v1.mp3");
  fs.readFile(filePath, function (err, file) {
    var base64File = Buffer.from(file, "binary").toString("base64");
    returnData.fileContent = base64File;
    res.json(returnData);
  });
});
app.get("/three", (req, res) => {
  var fs = require("fs");
  const path = require("path");
  var returnData = {};
  var filePath = path.join(__dirname, "cm.mp3");
  fs.readFile(filePath, function (err, file) {
    var base64File = Buffer.from(file, "binary").toString("base64");
    returnData.fileContent = base64File;
    res.json(returnData);
  });
});

app.listen(port, (err) => {
  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Listening on port ${port}`);
});
