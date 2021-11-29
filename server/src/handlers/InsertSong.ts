import { DB } from "../Database";
import { MessageHandler } from "../MessageHandler";
import Joi from "joi";
import { Schema } from "./Schemas";

async function onMessage(msg: any): Promise<any> {
  let queryReturn;
  const instrumentName = msg.instrument ? msg.instrument : "default";
  const instruments = await DB.runQuery("get_instrument", instrumentName);
  if (instruments.length <= 0 || !instruments[0].instrumentId) {
    return {};
  }
  const instrumentId = instruments[0].instrumentId;
  const author = msg.author ? msg.author : "default";
  const songName = msg.songName ? msg.songName : "default";
  queryReturn = await DB.runQuery(
    "insert_song",
    author,
    songName,
    instrumentId
  );
  queryReturn = await DB.runQuery("get_last_insert_row_id");
  if (queryReturn.length <= 0 || !queryReturn[0].lastInsertedId) {
    return {};
  }
  const songId = queryReturn[0].lastInsertedId;
  const notes = msg.notes ? msg.notes : [];
  for (let i = 0; i < notes.length; i++) {
    await DB.runQuery("insert_note", notes[i], i + 1, songId);
  }
  queryReturn = await DB.runQuery("get_song_by_id", songId);
  console.log(queryReturn);
  return { song: queryReturn.length > 0 ? queryReturn[0] : undefined };
}

const schema: Schema = {
  instrument: Joi.string().min(1).max(30).required(),
  author: Joi.string().min(1).max(30).required(),
  songName: Joi.string().min(1).max(30).required(),
  notes: Joi.array().items(Joi.string()).required(),
};
export const InsertSongHandler = new MessageHandler(
  "insert_song",
  schema,
  onMessage
);
