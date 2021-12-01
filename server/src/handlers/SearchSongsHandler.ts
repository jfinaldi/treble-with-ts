import { DB } from "../Database";
import { MessageHandler } from "../MessageHandler";
import Joi from "joi";
import { Schema } from "./Schemas";

async function onMessage(msg: any): Promise<any> {
  const search = msg.search ? msg.search : "default";
  const songs = await DB.runQuery(
    "search_songs",
    search,
    search,
    search,
    search
  );
  return { songs };
}

const schema: Schema = {
  search: Joi.string().min(1).max(30).required(),
};
export const SearchSongsHandler = new MessageHandler(
  "search_songs",
  schema,
  onMessage
);
