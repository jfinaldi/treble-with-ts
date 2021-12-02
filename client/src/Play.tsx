import * as Tone from "tone";
import { AppState } from "./State";
type PlayMode = "play" | "stop";
const sleep = (milliseconds: any) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const drum_boom = async (type_beat: number, time_delay: number) => {
  await sleep(time_delay);
  let rsp_url = "http://localhost:5005/drums/?type_beat=" + type_beat;
  let rsp_data = await fetch(rsp_url);
  let statusCheck = await fetch("http://localhost:5005/StatusStop");
  let status = await statusCheck.json();
  if (!status.status) {
    let rsp_json = await rsp_data.json();
    let audioSrc = "data:audo/wav;base64," + rsp_json.fileContent;
    let beat = new Tone.Player(audioSrc).toDestination();
    beat.autostart = true;
  }
};
const cat_meow = async (noteb: number, time_delay: number) => {
  await sleep(time_delay);
  let rsp_url = "http://localhost:5005/three";
  let rsp_data = await fetch(rsp_url);
  let rsp_json = await rsp_data.json();
  let statusCheck = await fetch("http://localhost:5005/StatusStop");
  let status = await statusCheck.json();
  if (!status.status) {
    let audioSrc = "data:audo/wav;base64," + rsp_json.fileContent;
    let beat = new Tone.Player(audioSrc).toDestination();
    beat.playbackRate = noteb;
    beat.autostart = true;
  }
};
function Play(state: AppState, args: any, mode?: PlayMode): AppState {
  switch (mode) {
    case "play":
      fetch("http://localhost:5005/SetStop/?Status=" + "F");
      var notes: string = "";
      var instrument_type: number = 0;
      try {
        //FROM PLAYLIST IN SIDENAV
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
        //INVALID INPUT FAILED, CATCH .FIND() UNDEFINED ERROR
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
          drum_boom(parseInt(i), _i);
          _i += 500;
        }
      }
      //CAT PIANO
      if (instrument_type === 3) {
        var cat_notes: string[] = notes.split(",");
        var _i: number = 650;
        for (let i of cat_notes) {
          cat_meow(parseFloat(i), _i);
          _i += 650;
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
