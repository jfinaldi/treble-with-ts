import { initServer } from "./src/Server";

function main() {
  initServer();
}

main();
// const express = require("express");
// const app = express();
// const port = 5005;
// app.use(express.static("public"));
// app.use(function (req: any, res: any, next: any) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
// app.get("/drums", (req: any, res: any) => {
//   const fs = require("fs");
//   const path = require("path");
//   const beat_file = `${req.query.type_beat}.wav`;
//   const returnData: any = {};
//   const filePath = path.join(__dirname + "/sounds/drums", beat_file);
//   fs.readFile(filePath, function (err: any, file: any) {
//     var base64File = Buffer.from(file, "binary").toString("base64");
//     returnData.fileContent = base64File;
//     res.json(returnData);
//   });
// });
// app.get("/three", (req: any, res: any) => {
//   const fs = require("fs");
//   const path = require("path");
//   const beat_file = "cm.mp3";
//   const returnData: any = {};
//   const filePath = path.join(__dirname + "/sounds/cat", beat_file);
//   fs.readFile(filePath, function (err: any, file: any) {
//     var base64File = Buffer.from(file, "binary").toString("base64");
//     returnData.fileContent = base64File;
//     res.json(returnData);
//   });
// });

// app.get("/flute", (req: any, res:any) => {
//   const fs = require("fs");
//   const path = require("path");
//   const flute_sound = `${req.query.flute_sound}.mp3`;
//   const returnData: any = {};
//   const filePath = path.join(__dirname + "/sounds/flute", flute_sound);
//   fs.readFile(filePath, function (err: any, file: any) {
//     var base64File = Buffer.from(file, "binary").toString("base64");
//     returnData.fileContent = base64File;
//     res.json(returnData);
//   });
// });

// app.listen(port, (err: any) => {
//   if (err) return console.log("ERROR", err);
//   console.log(`Listening on port ${port}`);
// });
