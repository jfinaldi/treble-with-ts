import { Server, Socket } from "socket.io";
import { DB } from "./Database";
import http from "http";
import { MessageHandler } from "./MessageHandler";
import { GetSongHandler, GetAllSongsHandler, GetRandomSongsHandler, SearchSongsHandler, InsertSongHandler, DeleteSongHandler } from "./handlers";

const PORT = 3001;
const VALID_ORIGINS = ["http://localhost:3000"];
const PING_TIMEOUT_MS = 10000;
const PING_INTERVAL_MS = 10000;
const WS_PATH = "/ws";

// Add messages you'd like to support here
export const validMessages: MessageHandler[] = [GetSongHandler, GetAllSongsHandler, GetRandomSongsHandler, SearchSongsHandler, InsertSongHandler, DeleteSongHandler];

function disconnectHandler(socket: Socket): (reason: string) => void {
  return (reason) => {
    console.debug(`disconnect[${socket.id}]: ${reason}`);
  };
}

function connectHandler(socket: Socket) {
  socket.once("disconnect", disconnectHandler(socket));
  socket.onAny((event, msg) => console.debug(`${event}[${socket.id}]: ${JSON.stringify(msg)}`));
  validMessages.forEach((handler) => handler.attach(socket));
}

export async function initServer(): Promise<Server> {
  const httpServer = http.createServer();

  httpServer.listen(PORT, "localhost");

  const server = new Server({
    path: WS_PATH,
    serveClient: false,
    pingTimeout: PING_TIMEOUT_MS,
    pingInterval: PING_INTERVAL_MS,
    cors: {
      origin: VALID_ORIGINS,
    },
    transports: ["websocket"],
  });

  console.debug(`opening socket on port ${PORT}`);

  server.on("connection", connectHandler);
  server.attach(httpServer);

  return server;
}
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 5005;
app.use(express.static("public"));
app.use(function (req: any, res: any, next: any) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get("/drums", (req: any, res: any) => {
  const beat_file: any = `${req.query.type_beat}.wav`;
  const returnData: any = {};
  const filePath: string = path.join(__dirname, "../") + "sounds/drums/" + beat_file;
  fs.readFile(filePath, function (err: any, file: Buffer | ArrayBuffer | string | any) {
    var base64File: string | undefined = Buffer.from(file, "binary").toString("base64");
    returnData.fileContent = base64File;
    res.json(returnData);
  });
});
app.get("/three", (req: any, res: any) => {
  const beat_file = "cm.mp3";
  const returnData: any = {};
  const filePath: string = path.join(__dirname, "../") + "sounds/cat/" + beat_file;
  fs.readFile(filePath, function (err: any, file: any) {
    var base64File = Buffer.from(file, "binary").toString("base64");
    returnData.fileContent = base64File;
    res.json(returnData);
  });
});

app.get("/flute", (req: any, res: any) => {
  const flute_sound = `${req.query.flute_sound}.mp3`;
  const returnData: any = {};
  const filePath: string = path.join(__dirname, "../") + "sounds/flute/" + flute_sound;
  fs.readFile(filePath, function (err: any, file: any) {
    var base64File = Buffer.from(file, "binary").toString("base64");
    returnData.fileContent = base64File;
    res.json(returnData);
  });
});
app.get("/xylophone", (req: any, res: any) => {
  const beat_sound = `${req.query.xylophone_sound}.mp3`;
  const returnData: any = {};
  const filePath: string = path.join(__dirname, "../") + "sounds/xylophone/" + beat_sound;
  fs.readFile(filePath, function (err: any, file: any) {
    var base64File = Buffer.from(file, "binary").toString("base64");
    returnData.fileContent = base64File;
    res.json(returnData);
  });
});
app.get("/harp", (req: any, res: any) => {
  const beat_sound = `${req.query.harp_sound}.mp3`;
  const returnData: any = {};
  const filePath: string = path.join(__dirname, "../") + "sounds/harp/" + beat_sound;
  fs.readFile(filePath, function (err: any, file: any) {
    var base64File = Buffer.from(file, "binary").toString("base64");
    returnData.fileContent = base64File;
    res.json(returnData);
  });
});
var STATE = false;
app.get("/StatusStop", (req: any, res: any) => {
  res.json({ status: STATE });
});
app.get("/SetStop", (req: any, res: any) => {
  const status = req.query.Status;
  STATE = status.includes("T");
  res.json({ status: 200 });
});

app.listen(port, (err: any) => {
  if (err) return console.log("ERROR", err);
  console.log(`Listening on port ${port}`);
});

// test code:
// (async () => {
//   try {
//     // const fs = require("fs");
//     // const path = require("path");
//     // fs.unlinkSync(path.join(__dirname, "..", "app.db"));
//     // await DB.initializeDB();
//     // console.log("init db now");
//     // let result;

//     // await DB.runQuery("delete_song", 5);
//     // await DB.runQuery("delete_notes", 5);

//     // result = await DB.runQuery("get_all_songs");
//     // console.log("came here with: ", result);

//     // result = await DB.runQuery("get_all_notes");
//     // console.log("came here with: ", result);
//     // // result = await DB.runQuery("get_random_songs");
//     // // console.log("came here with: ", result);
//     // result = await DB.runQuery("search_songs", "Default", "Default", "Default", "Default");
//     // console.log("came here with: ", result);
//   } catch (err) {
//     console.log("ERROR HERE INSTEAD: ", err);
//   }
// })();
// end test code ---
