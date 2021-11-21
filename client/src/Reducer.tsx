// 3rd party
import { List, Map, fromJS } from "immutable";

// project deps
import { Instrument } from "./Instruments";
import { Visualizer } from "./Visualizers";
import { AppState } from "./State";

//going to try to remove later
import * as Tone from "tone";

/** ------------------------------------------------------------------------ **
 * All user input is handled by DispatchAction.
 ** ------------------------------------------------------------------------ */

/**
 * Observation: pure map (compare and contrast with impure map)
 *
 * 'instrument': Instrument
 * 'visualizer': Visualizer
 * 'songs': List<string>
 * 'notes': List<{id: number, songTitle: string, notes: string}>
 */
type DispatchArgs = {
  [key: string]: any;
};

// A simple algebraic data-type with string literal types
type DispatchActionType = "SET_SOCKET" | "DELETE_SOCKET" | "SET_SONGS" | "PLAY_SONG" | "STOP_SONG" | "SET_LOCATION";

export class DispatchAction {
  readonly type: DispatchActionType;
  readonly args: Map<string, any>;

  constructor(type: DispatchActionType, args?: DispatchArgs) {
    this.type = type;
    this.args = fromJS(args) as Map<string, any>;
  }
}

/** ------------------------------------------------------------------------ **
 * Top-level application reducer.
 ** ------------------------------------------------------------------------ */

export function appReducer(state: AppState, action: DispatchAction): AppState {
  const { type, args } = action;

  const sleep = (milliseconds: any) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };
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
    try {
      fetch("http://localhost:5005/three")
        .then((response) => response.json())
        .then((rsp) => {
          let audioSrc = "data:audio/mp3;base64," + rsp.fileContent;
          let player = new Tone.Player(audioSrc).toDestination();
          player.playbackRate = noteb; // the playback rate speed changes the pitch
          player.autostart = true;
        });
    } catch (e) {
      console.log("fetch error for note");
      throw(e);
    }
  };
  function timeout(delay: number) {
    return new Promise((res) => setTimeout(res, delay));
  }

  // Question: Does this function remind of you registering callbacks? // Answer - nah
  const newState = (() => {
    switch (type) {
      case "SET_SOCKET": {
        const oldSocket = state.get("socket");
        if (oldSocket) {
          oldSocket.close();
        }
        return state.set("socket", args.get("socket"));
      }
      case "DELETE_SOCKET": {
        return state.delete("socket");
      }
      case "SET_SONGS": {
        const songs = args.get("songs");
        return state.set("songs", songs);
      }
      case "PLAY_SONG": {
        const notes = state
          .get("songs")
          .find((s: any) => s.get("id") === args.get("id"))
          .get("notes");
        const instrument_type = state
          .get("songs")
          .find((s: any) => s.get("id") === args.get("id"))
          .get("instrument");
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
        } 
        else {
          return state.set("notes", notes);
        }
      }
      case "STOP_SONG": {
        return state.delete("notes");
      }
      case "SET_LOCATION": {
        const pathname = args.getIn(["location", "pathname"], "") as string;
        const search = args.getIn(["location", "search"], "") as string;

        const instrumentName: string = pathname.substring(1);
        const visualizerName: string = new URLSearchParams(search.substring(1)).get("visualizer") ?? "";
        const instruments: List<Instrument> = state.get("instruments");
        const visualizers: List<Visualizer> = state.get("visualizers");

        const instrument = instruments.find((i) => i.name === instrumentName);
        const visualizer = visualizers.find((v) => v.name === visualizerName);

        return state.set("instrument", instrument).set("visualizer", visualizer);
      }
      default:
        console.error(`type unknown: ${type}\n`, args.toJS());
        return state;
    }
  })();

  console.debug(newState.update("socket", (s) => (s ? "[socket]" : s)).toJS());

  return newState;
}
