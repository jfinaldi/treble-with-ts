import { DB } from "../Database";
import { MessageHandler } from "../MessageHandler";
import Joi from "joi";
import { Schema } from "./Schemas";

async function onMessage(msg: any): Promise<any> {
  // msg = { songName: "someaName" };
  const songName = msg.songName ? msg.songName : "default";
  const songs = await DB.runQuery("get_song", songName);
  return { song: songs.length > 0 ? songs[0] : null };
}

const schema: Schema = {
  songName: Joi.string().min(1).max(30).required(),
};

export const GetSongHandler = new MessageHandler("get_song", schema, onMessage);
