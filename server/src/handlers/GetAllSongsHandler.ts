import { DB } from "../Database";
import { MessageHandler } from "../MessageHandler";

async function onMessage(): Promise<any> {
  const songs = await DB.runQuery("get_all_songs");

  console.log("songs message");

  return { songs };
}

const schema = {};

export const GetAllSongsHandler = new MessageHandler(
  "get_all_songs",
  schema,
  onMessage
);
