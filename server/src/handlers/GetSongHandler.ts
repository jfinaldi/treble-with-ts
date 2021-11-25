import { DB } from '../Database';
import { MessageHandler } from '../MessageHandler';

async function onMessage(): Promise<any> {
  const song = await DB.runQuery('get_song');
  return { song };
}

const schema = {};

export const GetSongHandler = new MessageHandler(
  'get_song',
  schema,
  onMessage,
);
