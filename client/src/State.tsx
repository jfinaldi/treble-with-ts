// 3rd party
import { List, Map } from "immutable";

// project dependencies
import { PianoInstrument } from "./instruments/Piano";
import { RippleVisualizer } from "./visualizers/asingh";
import { WaveformVisualizer } from "./visualizers/Waveform";
import { _Cat } from "./instruments/jfinaldi";
import { _Flute } from "./instruments/hgarg";
import { _Drums } from "./instruments/asingh";

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
const instruments = List([PianoInstrument, _Drums, _Cat, _Flute]);
const visualizers = List([WaveformVisualizer, RippleVisualizer]);
export const defaultState: AppState = Map<string, any>({
  instruments,
  visualizers,
});
