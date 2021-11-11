import * as Tone from "tone";
import { Instrument } from "../Instruments";
import { List, Range } from 'immutable';
import classNames from 'classnames';
import BK from '../img/blackKey_a.svg';
import WK from '../img/whiteKey_a.png';

interface CatKeyProps {
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  noteb: number;
  duration?: string;
  player?: Tone.Player; // Contains library code for making sound
  minor?: boolean; // True if minor key, false if major key
  index: number; // octave + index together give a location for the piano key
}

export function CatKey({
  note,
  noteb, // this is the adjusting number for varying notes
  player,
  minor,
  index,
}: CatKeyProps): JSX.Element {

  // our function to play a cat meow note
  const cat_meow = () => {
    try {
      fetch("http://localhost:5005/three")
        .then((response) => response.json())
        .then((rsp) => {
          var audioSrc = "data:audio/mp3;base64," + rsp.fileContent;
          player = new Tone.Player(audioSrc).toDestination();
          player.playbackRate = noteb; // the playback rate speed changes the pitch
          player.autostart = true;
        });
    } catch (e) {
      console.log("fetch error for note", note);
      throw(e);
    }
  };

  // return a black paw
  if(minor) {
    return (
      <div 
        onClick={cat_meow}
        style={{
          position: 'absolute',
          top: 0,
          left: `${index * 2}rem`,
          zIndex: 1,
          width: '1.5rem',
          marginLeft: '0.25rem',
        }}>
        <img src={BK} alt="BK" width="40" height="100"></img>
      </div>
    );
  }
  //return a white paw
  else {
    return (
      <div 
        onClick={cat_meow}
        style={{
          position: 'absolute',
          top: '2rem',
          left: `${index * 2}rem`,
          zIndex: 0,
          width: '2rem',
          marginLeft: 0,
        }}>
        <img src={WK} alt="WK" width="45" height="150"></img>
      </div>
    );
  }

}

function CatPiano(): JSX.Element {

  // This list of keys represents all the keys on this kitty keyboard.
  // noteb is the adjustment number to change the pitch of the sound file
  // by scaling the speed of the playback of the file for each note. The 
  // result mimics different key notes to some degree of accuracy 
  const keys = List([
    // first octave
    { noteb: 0.750, note: 'C', idx: 0 },       // x
    { noteb: 0.785, note: 'Db', idx: 0.5 },    // x
    { noteb: 0.830, note: 'D', idx: 1 },       // x
    { noteb: 0.885, note: 'Eb', idx: 1.5 },    // x
    { noteb: 0.950, note: 'E', idx: 2 },       // x
    { noteb: 1.050, note: 'F', idx: 3 },       // x
    { noteb: 1.089, note: 'Gb', idx: 3.5 },    // x
    { noteb: 1.150, note: 'G', idx: 4 },       // x
    { noteb: 1.185, note: 'Ab', idx: 4.5 },    // x (double check)
    { noteb: 1.268, note: 'A', idx: 5 },       // x
    { noteb: 1.330, note: 'Bb', idx: 5.5 },    // x
    { noteb: 1.455, note: 'B', idx: 6 },       // x

    // second octave 
    /*To calculate these, I used a percentage of the values between
    corresponding adjacent notes for the first octave. So C is
    approximately  95.54% (or 0.9554) of Db, calculated by dividing 
    C = 0.750 by Db = 0.785. To calculate Db2, I take C2 and divide 
    by 0.9554 to get Db2 scaled in the same way that C and Db are.
    The reason this was done this way was so that I would only have
    to tune one octave by ear instead of two.*/
    { noteb: 1.567, note: 'C2', idx: 7 },      // x 
    { noteb: 1.640, note: 'Db2', idx: 7.5 },   // 1.640 = 1.567 / .9554
    { noteb: 1.741, note: 'D2', idx: 8 },      // x
    { noteb: 1.848, note: 'Eb2', idx: 8.5 },   // 1.848 = 1.640 / 0.887
    { noteb: 1.994, note: 'E2', idx: 9 },      // delta = 1 - 0.873
    { noteb: 2.200, note: 'F2', idx: 10 },     // .90476
    { noteb: 2.282, note: 'Gb2', idx: 10.5 },  // 2.282 = 2.2 / 0.9641
    { noteb: 2.400, note: 'G2', idx: 11 },     // 2.2 / 0.913
    { noteb: 2.483, note: 'Ab2', idx: 11.5 },  // 2.282 / .91898
    { noteb: 2.646, note: 'A2', idx: 12 },     // 0.9069
    { noteb: 2.787, note: 'Bb2', idx: 12.5 },  // 2.483 / 0.891
    { noteb: 3.036, note: 'B2', idx: 13 },     // 0.87147
  ]);

  return (
    /*Outer box for the purple background */
    <div className={classNames('pv4', 'pl5', 'bg-light-purple')}>
      {/*Inner box for the actual keyboard */}
      <div className={classNames('relative', 'dib', 'h5', 
                                  'ml4', 'justify-center')}>
        {Range(1, 2).map(keyboard =>
          keys.map(key => {
            const isMinor = key.note.indexOf('b') !== -1;
            const note = `${key.note}${keyboard}`;
            return (
              <CatKey
                key={note}
                note={note}
                noteb={key.noteb}
                minor={isMinor}
                index={(keyboard - 1) * 2 + key.idx}
              />
            );
          }),
        )}
      </div>
      <div className={classNames('avenir', 'fw8', 'b', 'f1','dib', 'ml4-ns', 'pl5')}>
        DJ CatPaw
      </div>
    </div>
  );
}

export const _Cat = new Instrument("DJ CatPaw", CatPiano);




