import * as Tone from "tone";
import { Instrument } from "../Instruments";
import Bass from "../img/drums/bass.svg";
import Top_Left from "../img/drums/pip_stand.svg";
import Mini_Boom from "../img/drums/hmm.svg";
import smn from "../img/drums/smn_.svg";
import "./drums.css";
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
    <div className="drum_container">
      <img src={Top_Left} alt="a" style={{ height: 200, width: 150, transform: "rotate(20deg)" }} onClick={() => drum_boom(4)} />
      <img src={Mini_Boom} alt="b" style={{ height: 150, width: 150, transform: "rotate(0)" }} onClick={() => drum_boom(5)} />
      <img src={Top_Left} alt="c" style={{ height: 150, width: 150, transform: "rotate(-20deg)" }} onClick={() => drum_boom(6)} />
      <img src={Mini_Boom} alt="d" style={{ height: 120, width: 120, transform: "rotate(20deg)" }} onClick={() => drum_boom(7)} />
      <img src={smn} alt="e" style={{ height: 150, width: 150, transform: "rotate(0deg)" }} onClick={() => drum_boom(8)} />
      <img src={Mini_Boom} alt="f" style={{ height: 120, width: 120, transform: "rotate(-20deg)" }} onClick={() => drum_boom(9)} />
      <img src={smn} alt="g" style={{ height: 150, width: 150, transform: "rotate(0deg)" }} onClick={() => drum_boom(10)} />
      <img src={Bass} alt="k" style={{ height: 150, width: 150 }} onClick={() => drum_boom(11)} />
      <img src={smn} alt="m" style={{ height: 150, width: 150, transform: "rotate(0deg)" }} onClick={() => drum_boom(12)} />
    </div>
  );
}

export const _Drums = new Instrument("Drums", Drums);
