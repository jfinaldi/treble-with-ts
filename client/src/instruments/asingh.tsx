import * as Tone from "tone";
import { Instrument } from "../Instruments";
const random_color = () => "#" + Math.floor(Math.random() * 16777215).toString(16);
const btn = {
  height: "150px",
  width: "150px",
  borderRadius: "50%",
  border: "1px solid " + random_color(),
};
function Drums(): JSX.Element {
  const drum_boom = async (type_beat: number) => {
    let response_url = "http://localhost:5005/drums/?type_beat=" + type_beat;
    let response = await fetch(response_url);
    let rsp = await response.json();
    let audioSrc = "data:audo/wav;base64," + rsp.fileContent;
    let g = new Tone.Player(audioSrc).toDestination();
    g.autostart = true;
  };
  return (
    <div className="pv4">
      <h3>Drum Kit</h3>
      <button style={btn} onClick={() => drum_boom(4)}>
        !
      </button>
      <button style={btn} onClick={() => drum_boom(5)}>
        Pow!
      </button>
      <button style={btn} onClick={() => drum_boom(6)}>
        Wow!
      </button>
      <button style={btn} onClick={() => drum_boom(7)}>
        Boom!
      </button>
      <button style={btn} onClick={() => drum_boom(8)}>
        Pop!
      </button>
      <button style={btn} onClick={() => drum_boom(9)}>
        Crackle!
      </button>
      <button style={btn} onClick={() => drum_boom(10)}>
        Ow!
      </button>
      <button style={btn} onClick={() => drum_boom(11)}>
        Oo!
      </button>
      <button style={btn} onClick={() => drum_boom(12)}>
        Bo!
      </button>
    </div>
  );
}

export const _Drums = new Instrument("Drums", Drums);
