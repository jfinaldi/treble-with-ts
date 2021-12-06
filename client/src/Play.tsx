import * as Tone from "tone";
import { AppState } from "./State";
type PlayMode = "play" | "stop";
const sleep = (milliseconds: any) => new Promise((resolve) => setTimeout(resolve, milliseconds));

const urls: string[] = [ "http://localhost:5005/drums/?type_beat=",
                         "http://localhost:5005/harp/?harp_sound=",
                         "http://localhost:5005/three",
                         "http://localhost:5005/xylophone/?xylophone_sound=" ];

const playNote = async (instrument: number, note: string | number, time_delay: number) => {
  await sleep(time_delay);
  console.log("Note: ", note, "\n");
  let url: string;
  if(instrument === 3) url = urls[instrument - 1];
  else url = urls[instrument - 1] + (note as string);
  let rsp_data = await fetch(url);
  let rsp_json = await rsp_data.json();
  let statusCheck = await fetch("http://localhost:5005/StatusStop");
  let status = await statusCheck.json();
  if (!status.status) {
    let audioSrc = "data:audo/wav;base64," + rsp_json.fileContent;
    let player = new Tone.Player(audioSrc).toDestination();
    if(instrument === 3) player.playbackRate = note as number;
    player.autostart = true;
  }
};

function Play(state: AppState, args: any, mode?: PlayMode): AppState {
  switch (mode) {
    case "play":
      fetch("http://localhost:5005/SetStop/?Status=" + "F");
      var notes: string = "";
      var instrument_type: number = 0;
      try {
        var id: number = 0;
        if (typeof args === "number") id = args;
        else id = args.get("id");
        notes = state
          .get("songs")
          .find((s: any) => s.get("songId") === id)
          .get("notes");
        instrument_type = state
          .get("songs")
          .find((s: any) => s.get("songId") === id)
          .get("instrumentId");
      } catch (e) {
        console.log("Error ", e);
        return state.set("notes", "");
      }
      //PIANO
      if (instrument_type === 5) {
        console.log("shoudd change state");
        return state.set("notes", notes.replace(/,/g, "\xa0"));
      }
      //DRUMS
      if (instrument_type === 1) {
        var drum_beats: string[] = notes.split(",");
        var _i: number = 500;
        for (let i of drum_beats) {
          playNote(instrument_type, parseInt(i), _i);
          _i += 500;
        }
      }
      //CAT PIANO
      if (instrument_type === 3) {
        console.log(notes);
        var cat_notes: string[] = notes.split(",");
        var _i: number = 650;
        for (let i of cat_notes) {
          playNote(instrument_type, parseFloat(i), _i);
          _i += 650;
        }
      }
      //XYLOPHONE
      if (instrument_type === 4) {
        console.log(notes);
        var beats: string[] = notes.split(",");
        var _i: number = 500;
        for (let i of beats) {
          playNote(instrument_type, parseInt(i), _i);
          _i += 500;
        }
      }
      //HARP
      if (instrument_type === 2) {
        var beats: string[] = notes.split(",");
        var _i: number = 500;
        for (let i of beats) {
          playNote(instrument_type, i, _i);
          _i += 500;
        }
      }
      return state.set("notes", "");
    case "stop":
      return state.set("notes", "");
    default: {
      return state.set("notes", "");
    }
  }
}
export { Play };
