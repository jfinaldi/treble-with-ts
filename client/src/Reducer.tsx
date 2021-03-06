// 3rd party
import { List, Map, fromJS } from "immutable";

// project deps
import { Instrument } from "./Instruments";
import { Visualizer } from "./Visualizers";
import { AppState } from "./State";
import { Play } from "./Play";

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
// A simple algebraic data-type with string literal types
type DispatchActionType =
  | "SET_SOCKET"
  | "DELETE_SOCKET"
  | "SET_SONGS"
  | "PLAY_SONG"
  | "STOP_SONG"
  | "SET_LOCATION"
  | "TOGGLE_RECORDING"
  | "ADD_NOTE"
  | "CLEAR_NOTES"
  | "SET_INSTRUMENT"
  | "RECORD_COMPLETE"
  | "SET_CURRENTLY_PLAYING_NOTE"
  | "SET_CURRENTLY_PLAYING_SONG";

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
      case "SET_INSTRUMENT": {
        return state.set("activeInstrument", args.get("instrument"));
      }
      case "SET_CURRENTLY_PLAYING_SONG": {
        const toBePlayedSong = args.get("song")?.toJS();
        return state.set("currentlyPlayingSong", {
          ...toBePlayedSong,
          notes: toBePlayedSong.notes.split(","),
        });
      }
      case "PLAY_SONG": {
        return Play(state, args, "play");
      }
      case "STOP_SONG": {
        return state.set("isSongPlaying", false);
      }
      case "SET_CURRENTLY_PLAYING_NOTE": {
        console.log("here reaching");
        const currentlyPlayingSong = state.get("currentlyPlayingSong");
        if (!currentlyPlayingSong) return state;
        return state.set("currentlyPlayingSong", {
          ...state.get("currentlyPlayingSong"),
          currentlyPlayingNote: args.get("currentlyPlayingNote"),
        });
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
      case "TOGGLE_RECORDING": {
        const surrentVal = state.get("isRecording");
        return state.set("isRecording", !surrentVal);
      }
      case "RECORD_COMPLETE": {
        return state.set("isComplete", !state.get("isComplete"));
      }
      case "ADD_NOTE": {
        const currentRecordedNotes = state.get("recordedNotes");
        return state.set("recordedNotes", [...currentRecordedNotes, args.get("note")]);
      }
      case "CLEAR_NOTES": {
        return state.set("recordedNotes", []);
      }

      default:
        console.error(`type unknown: ${type}\n`, args.toJS());
        return state;
    }
  })();

  console.debug(newState.update("socket", (s) => (s ? "[socket]" : s)).toJS());

  return newState;
}
