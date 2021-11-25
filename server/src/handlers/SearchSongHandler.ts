import { DB } from '../Database';
import { MessageHandler } from '../MessageHandler';

async function onMessage(): Promise<any> {
  const song = await DB.runQuery('search_song');
  return { song };
}

const schema = {};

export const SearchSongsHandler = new MessageHandler(
  'search_song',
  schema,
  onMessage,
);
