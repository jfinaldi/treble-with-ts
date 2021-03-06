import * as Tone from "tone";
import { useEffect } from "react";
import { List, Range } from "immutable";
import classNames from "classnames";
import BK from "../img/blackKey_a.svg";
import WK from "../img/whiteKey_a.png";
import { DispatchAction } from "../Reducer";
import { Instrument, InstrumentProps } from "../Instruments";
import { AppState } from "../State";

interface CatKeyProps {
  noteb: number;
  player?: Tone.Player; // Contains library code for making sound
  isFlat?: boolean;
  index: number; // octave + index together give a location for the piano key
  state: AppState;
  dispatch: React.Dispatch<DispatchAction>;
  isRecording: boolean;
  recordedNotes: any;
}

// our function to play a cat meow note
const cat_meow = (
  noteb: number,
  isRecording: boolean,
  dispatch: React.Dispatch<DispatchAction>,
  overwriteStopRecording: boolean = false
) => {
  try {
    fetch("http://localhost:5005/three")
      .then((response) => response.json())
      .then((rsp) => {
        var audioSrc = "data:audio/mp3;base64," + rsp.fileContent;
        const player = new Tone.Player(audioSrc).toDestination();
        player.playbackRate = noteb; // the playback rate speed changes the pitch
        player.autostart = true;

        if (isRecording && !overwriteStopRecording)
          dispatch(new DispatchAction("ADD_NOTE", { note: noteb.toString() }));
      });
  } catch (e) {
    console.log("fetch error for note");
    throw e;
  }
};

export function CatKey({
  noteb, // this is the adjusting number for varying notes
  isFlat,
  index,
  dispatch,
  isRecording,
  recordedNotes,
}: CatKeyProps): JSX.Element {
  useEffect(() => {
    if (!isRecording && recordedNotes.length > 0)
      dispatch(new DispatchAction("RECORD_COMPLETE"));
  }, [isRecording]);

  // return a black paw
  if (isFlat) {
    return (
      <div
        onClick={() => cat_meow(noteb, isRecording, dispatch)}
        style={{
          left: `${index * 2 + 0.1}rem`,
        }}
        className="absolute top--2-ns z-1 w3 ml1"
      >
        <img src={BK} alt="BK" height="110"></img>
      </div>
    );
  }
  //return a white paw
  else {
    return (
      <div
        onClick={() => cat_meow(noteb, isRecording, dispatch)}
        style={{
          left: `${index * 2}rem`,
        }}
        className="absolute top-0 z-0 w2 ml1"
      >
        <img src={WK} alt="WK" height="150"></img>
      </div>
    );
  }
}

function CatPiano({ state, dispatch }: InstrumentProps): JSX.Element {
  // This list of keys represents all the keys on this kitty keyboard.
  // noteb is the adjustment number to change the pitch of the sound file
  // by scaling the speed of the playback of the file for each note. The
  // result mimics different key notes to some degree of accuracy
  const keys = List([
    // first octave
    { noteb: 0.75, isFlat: false, idx: 0 }, // x
    { noteb: 0.785, isFlat: true, idx: 0.5 }, // x
    { noteb: 0.83, isFlat: false, idx: 1 }, // x
    { noteb: 0.885, isFlat: true, idx: 1.5 }, // x
    { noteb: 0.95, isFlat: false, idx: 2 }, // x
    { noteb: 1.03, isFlat: false, idx: 3 }, // x OUT OF TUNE
    { noteb: 1.089, isFlat: true, idx: 3.5 }, // x
    { noteb: 1.15, isFlat: false, idx: 4 }, // x
    { noteb: 1.185, isFlat: true, idx: 4.5 }, // x (double check)
    { noteb: 1.268, isFlat: false, idx: 5 }, // x
    { noteb: 1.33, isFlat: true, idx: 5.5 }, // x
    { noteb: 1.455, isFlat: false, idx: 6 }, // x

    // second octave
    /*To calculate these, I used a percentage of the values between
    corresponding adjacent notes for the first octave. So C is
    approximately  95.54% (or 0.9554) of Db, calculated by dividing 
    C = 0.750 by Db = 0.785. To calculate Db2, I take C2 and divide 
    by 0.9554 to get Db2 scaled in the same way that C and Db are.
    The reason this was done this way was so that I would only have
    to tune one octave by ear instead of two.*/
    { noteb: 1.567, isFlat: false, idx: 7 }, // x
    { noteb: 1.64, isFlat: true, idx: 7.5 }, // 1.640 = 1.567 / .9554
    { noteb: 1.741, isFlat: false, idx: 8 }, // x
    { noteb: 1.848, isFlat: true, idx: 8.5 }, // 1.848 = 1.640 / 0.887
    { noteb: 1.994, isFlat: false, idx: 9 }, // delta = 1 - 0.873
    { noteb: 2.195, isFlat: false, idx: 10 }, // .90476
    { noteb: 2.282, isFlat: true, idx: 10.5 }, // 2.282 = 2.2 / 0.9641
    { noteb: 2.4, isFlat: false, idx: 11 }, // 2.2 / 0.913
    { noteb: 2.483, isFlat: true, idx: 11.5 }, // 2.282 / .91898
    { noteb: 2.646, isFlat: false, idx: 12 }, // 0.9069
    { noteb: 2.787, isFlat: true, idx: 12.5 }, // 2.483 / 0.891
    { noteb: 3.036, isFlat: false, idx: 13 }, // 0.87147
  ]);
  const isRecording = state.get("isRecording");
  const recordedNotes = state.get("recordedNotes");
  useEffect(() => {
    if (!isRecording && recordedNotes.length > 0)
      dispatch(new DispatchAction("RECORD_COMPLETE"));
  }, [isRecording]);

  return (
    /*Outer box for the purple background */
    <div className={classNames("mt5 pv1 pl0")}>
      <div
        className={classNames(
          "absolute-m ml5 pv1 h5 bg-light-purple w9 br3 shadow-6"
        )}
      >
        {/*Inner box for the actual keyboard */}
        <div className={classNames("relative flex mt5 ml4")}>
          {Range(1, 2).map((keyboard) =>
            keys.map((key) => {
              return (
                <CatKey
                  noteb={key.noteb}
                  isFlat={key.isFlat}
                  index={(keyboard - 1) * 2 + key.idx}
                  dispatch={dispatch}
                  state={state}
                  isRecording={isRecording}
                  recordedNotes={recordedNotes}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export const _Cat = new Instrument('DJ Catpaw', CatPiano);
