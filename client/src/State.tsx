// 3rd party
import { List, Map } from "immutable";

// project dependencies
import { RippleVisualizer } from "./visualizers/asingh";
import { WaveformVisualizer } from "./visualizers/Waveform";
import { RockVisualizer } from "./visualizers/HimanshuGarg701";
import { CatVisualizer } from "./visualizers/jfinaldi";
import { PianoInstrument } from "./instruments/Piano";
import { _Cat } from "./instruments/jfinaldi";
import { _Drums } from "./instruments/asingh";
import { HarpInstrument } from "./instruments/xo28122000";

import { _Xylophone } from "./instruments/HimanshuGarg701";
import { FancyVisualizer } from "./visualizers/xo28122000";
/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */

/**
 * Observation: pure map (compare and contrast with impure map)
 *
 * 'instrument': Instrument
 * 'visualizer': Visualizer
 */
export type AppState = Map<string, any>;
const instruments = List([
  PianoInstrument,
  _Drums,
  HarpInstrument,
  _Cat,
  _Xylophone,
]);
const visualizers = List([
  WaveformVisualizer,
  RippleVisualizer,
  FancyVisualizer,
  CatVisualizer,
  RockVisualizer,
]);
export const defaultState: AppState = Map<string, any>({
  instruments,
  visualizers,
  activeInstrument: "",
  isComplete: false,
  isRecording: false,
  recordedNotes: [],
  currentlyPlayingSong: null,
  isSongPlaying: false,

});
