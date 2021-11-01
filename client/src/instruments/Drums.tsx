import * as Tone from "tone";
import { Instrument } from "../Instruments";

function Drums(): JSX.Element {
  const _drum_Beat_one = () => {
    try {
      fetch("http://localhost:5005/two")
        .then((response) => response.json())
        .then((rsp) => {
          var audioSrc = "data:audio/mp3;base64," + rsp.fileContent;
          const g = new Tone.Player(audioSrc).toDestination();
          g.autostart = true;
        });
    } catch (e) {
      console.log("fetch error");
      throw(e);
    }
  };
  const cat_meow = () => {
    try {
      fetch("http://localhost:5005/three")
        .then((response) => response.json())
        .then((rsp) => {
          var audioSrc = "data:audio/mp3;base64," + rsp.fileContent;
          const g = new Tone.Player(audioSrc).toDestination();
          g.autostart = true;
        });
    } catch (e) {
      console.log("fetch error");
      throw(e);
    }
  };
  return (
    <div className="pv4">
      <h3>Drums</h3>
      <button onClick={_drum_Beat_one}>Drum Beat 1</button>
      <button onClick={cat_meow}>Cat Meow</button>
    </div>
  );
}

export const _Drums = new Instrument("Drums", Drums);
