import { send } from "./Socket";
import { Socket } from "socket.io-client";

export const isProduction = process.env.NODE_ENV === "production";

export const insertNewSongInDB = async (
  socket: Socket,
  instrument: string,
  author: string,
  songName: string,
  notes: string[]
) => {
  notes = notes.map((note) => JSON.stringify(note));
  let test = await send(socket, "insert_song", {
    instrument: instrument,
    author: author,
    songName: songName,
    notes: notes,
  });
  console.log("just inserted a new song!", test);
};
