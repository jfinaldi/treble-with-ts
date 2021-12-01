import { DB } from "../Database";
import { MessageHandler } from "../MessageHandler";

async function onMessage(msg: any): Promise<any> {
  const songs = await DB.runQuery("get_all_songs");
  return { songs };
}

const schema = {};

export const GetAllSongsHandler = new MessageHandler(
  "get_all_songs",
  schema,
  onMessage
);
