import { DB } from "../Database";
import { MessageHandler } from "../MessageHandler";
import Joi from "joi";
import { Schema } from "./Schemas";

async function onMessage(msg: any): Promise<any> {
  if (!msg.songId) {
    return;
  }
  const songId = msg.songId;
  const deletedSong = await DB.runQuery("get_song_by_id", songId);
  await DB.runQuery("delete_song", songId);
  await DB.runQuery("delete_notes", songId);
  return { deletedSong: deletedSong.length > 0 ? deletedSong[0] : undefined };
}

const schema: Schema = {
  songId: Joi.string().required(),
};
export const DeleteSongHandler = new MessageHandler(
  "delete_song",
  schema,
  onMessage
);
