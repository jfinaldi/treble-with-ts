// 3rd party
import { List, Map } from "immutable";

// project dependencies
import { RippleVisualizer } from "./visualizers/asingh";
import { WaveformVisualizer } from "./visualizers/Waveform";
import {RockVisualizer} from "./visualizers/hgarg"
import { CatVisualizer } from "./visualizers/jfinaldi_vis";
import { PianoInstrument } from "./instruments/Piano";
import { _Cat } from "./instruments/jfinaldi";
import { _Flute } from "./instruments/hgarg";
import { _Drums } from "./instruments/asingh";
import { HarpInstrument } from "./instruments/xo28122000";

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
const instruments = List([PianoInstrument, HarpInstrument, _Drums, _Cat, _Flute]);
const visualizers = List([WaveformVisualizer, RippleVisualizer, CatVisualizer, RockVisualizer]);
export const defaultState: AppState = Map<string, any>({
  instruments,
  visualizers,
});
