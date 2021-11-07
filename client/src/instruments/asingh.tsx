import * as Tone from "tone";
import { Instrument } from "../Instruments";
const random_color = () => "#" + Math.floor(Math.random() * 16777215).toString(16);
const btnGroup = {
  width: "100%",
  display: "grid",
  gridTemplateColumns: "1fr 0.75fr 1fr",
  gridColumnGap: "20px",
  gridRowGap: "20px",
  justifyItems: "stretch",
  alignItems: "inital",
};
const sphere = {
  display: "block",
  borderRadius: "100%",
  height: "200px",
  width: "200px",
  margin: "0",
  background: "radial-gradient(circle at 100px 100px, #FFB6C1, #000)",
};
const btnStyle = {
  padding: "20px 24px",
  height: "100px",
  width: "150px",
  borderRadius: "150px 150px 0 0",
  cursor: `url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/9632/meh.png"), auto`,
};
const cymbal = {
  backgroundColor: "#f0e130",
  width: "200px",
  height: "100px",
  borderRadius: "100%",
  borderBottomLeftRadius: "0",
  cursor: `url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/9632/meh.png"), auto`,
};
const drum_cylindar = {
  width: "100px",
  height: "100px",
  borderRadius: "50px/25px",
  backgroundColor: "rgba(160, 160, 160, 0.5)",
  cursor: `url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/9632/meh.png"), auto`,
};
const drum_cylindar_v2 = {
  width: "500px",
  height: "100px",
  borderRadius: "50px/25px",
  backgroundColor: "rgba(160, 160, 160, 0.5)",
  cursor: `url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/9632/meh.png"), auto`,
};
function Drums(): JSX.Element {
  const drum_boom = async (type_beat: number) => {
    let rsp_url = "http://localhost:5005/drums/?type_beat=" + type_beat;
    let rsp_data = await fetch(rsp_url);
    let rsp_json = await rsp_data.json();
    let audioSrc = "data:audo/wav;base64," + rsp_json.fileContent;
    let beat = new Tone.Player(audioSrc).toDestination();
    beat.autostart = true;
  };
  return (
    <div className="test" style={btnGroup}>
      <button style={cymbal} onClick={() => drum_boom(4)}>
        Tsk!
      </button>
      <button style={btnStyle} onClick={() => drum_boom(5)}>
        Pow!
      </button>
      <button style={cymbal} onClick={() => drum_boom(6)}>
        Wow!
      </button>
      <button style={btnStyle} onClick={() => drum_boom(7)}>
        Boom!
      </button>
      <button style={drum_cylindar_v2} onClick={() => drum_boom(8)}>
        Pop!
      </button>
      <button style={sphere} onClick={() => drum_boom(9)}>
        Crackle!
      </button>
      <button style={btnStyle} onClick={() => drum_boom(10)}>
        Ow!
      </button>
      <button style={drum_cylindar} onClick={() => drum_boom(11)}>
        Oo!
      </button>
      <button style={drum_cylindar} onClick={() => drum_boom(12)}>
        Bo!
      </button>
    </div>
  );
}

export const _Drums = new Instrument("Drums", Drums);
