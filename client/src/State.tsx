// 3rd party
import { List, Map } from "immutable";

// project dependencies
import { PianoInstrument } from "./instruments/Piano";
import { _Drums } from "./instruments/asingh";
import { WaveformVisualizer } from "./visualizers/Waveform";
import { _Cat } from "./instruments/jfinaldi";
import { _Xylophone } from "./instruments/hgarg";


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
const instruments = List([PianoInstrument, _Drums, _Cat, _Xylophone]);

const visualizers = List([WaveformVisualizer]);
export const defaultState: AppState = Map<string, any>({
  instruments,
  visualizers,
});
