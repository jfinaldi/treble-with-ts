import * as Tone from "tone";
import { AppState } from "./State";
type PlayMode = "play" | "pause" | "stop";
const sleep = (milliseconds: any) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const drum_boom = async (type_beat: number, time_delay: number) => {
  await sleep(time_delay);
  let rsp_url = "http://localhost:5005/drums/?type_beat=" + type_beat;
  let rsp_data = await fetch(rsp_url);
  let rsp_json = await rsp_data.json();
  let audioSrc = "data:audo/wav;base64," + rsp_json.fileContent;
  let beat = new Tone.Player(audioSrc).toDestination();
  beat.autostart = true;
};
const cat_meow = async (noteb: number, time_delay: number) => {
  await sleep(time_delay);
  let rsp_url = "http://localhost:5005/three";
  let rsp_data = await fetch(rsp_url);
  let rsp_json = await rsp_data.json();
  let audioSrc = "data:audo/wav;base64," + rsp_json.fileContent;
  let beat = new Tone.Player(audioSrc).toDestination();
  beat.playbackRate = noteb;
  beat.autostart = true;
};
function Play(state: AppState, args: any, mode?: PlayMode, selection?: boolean): AppState {
  switch (mode) {
    case "play":
      var notes = "";
      var instrument_type = "";
      if (selection) {
        notes = state
          .get("songs")
          .find((t: any) => t.get("songTitle") === args)
          .get("notes");
        instrument_type = state
          .get("songs")
          .find((t: any) => t.get("songTitle") === args)
          .get("instrument");
      } else {
        notes = state
          .get("songs")
          .find((s: any) => s.get("id") === args.get("id"))
          .get("notes");
        instrument_type = state
          .get("songs")
          .find((s: any) => s.get("id") === args.get("id"))
          .get("instrument");
      }
      if (instrument_type === "drum") {
        var drum_beats: string[] = notes.split(",");
        var _i: number = 500;
        for (let i of drum_beats) {
          drum_boom(parseInt(i), _i);
          _i += 500;
        }
        return state.set("notes", "");
      }
      if (instrument_type === "cat") {
        var cat_notes: string[] = notes.split(",");
        var _i: number = 650;
        for (let i of cat_notes) {
          cat_meow(parseFloat(i), _i);
          _i += 650;
        }
        return state.set("notes", "");
      } else {
        console.log("piano not implemented");
        return state.set("notes", notes);
      }
    case "pause":
      console.log("pause not implemented");
      return state.set("notes", "");
    case "stop":
      console.log("stop not implemented");
      return state.set("notes", "");
    default: {
      return state.set("notes", "");
    }
  }
}
export { Play };
