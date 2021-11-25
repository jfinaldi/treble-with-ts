import { DB } from '../Database';
import { MessageHandler } from '../MessageHandler';

async function onMessage(): Promise<any> {
  const songs = await DB.runQuery('get_random_songs');
  return { songs };
}

const schema = {};

export const GetRandomSongsHandler = new MessageHandler(
  'get_random_songs',
  schema,
  onMessage,
);
