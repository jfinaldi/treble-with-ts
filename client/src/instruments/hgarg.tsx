import * as Tone from "tone";
import { Instrument } from "../Instruments";

const flute = {
    width: "980px",
    height: "100px",
    borderRadius: "30% 10% 10% 30%",
    marginLeft: "50px",
    backgroundColor: "#cd853f",
  };

const initialHole = {
  height: "25px",
  width: "25px",
  backgroundColor: "black",
  borderRadius: "50%",
  display: "inline-block",
  marginTop: "37px",
  marginLeft: "50px",
  border: "none"
};


const hole = {
    height: "25px",
    width: "25px",
    backgroundColor: "black",
    borderRadius: "50%",
    marginTop: "37px",
    marginLeft: "200px",
    border: "none"
};

const blowAir = {
    height: "100px",
    width: "100px",
    backgroundColor: "green",
    borderRadius: "30%",
    marginLeft: "80px",
    marginTop: "30px",
    border: "none"
};

function Flute(): JSX.Element {

    const soundsOn = async (soundType: number) => {
        let url = "http://localhost:5005/flute/?flute_sound=" + soundType;
        let data = await fetch(url);
        let resJson = await data.json();
        let audioSrc = "data:audo/wav;base64," + resJson.fileContent;
        let beat = new Tone.Player(audioSrc).toDestination();
        beat.autostart = true;
    }
    return(
        <div>
            <div style={flute}>
                <div style={initialHole} onClick={() => soundsOn(1)}></div>
                <button style={hole} onClick={() => soundsOn(2)}></button>
                <button style={initialHole} onClick={() => soundsOn(3)}></button>
                <button style={initialHole} onClick={() => soundsOn(4)}></button>
                <button style={initialHole} onClick={() => soundsOn(5)}></button>
                <button style={initialHole} onClick={() => soundsOn(6)}></button>
                <button style={initialHole} onClick={() => soundsOn(7)}></button>
                <button style={initialHole} onClick={() => soundsOn(8)}></button>
                <button style={initialHole} onClick={() => soundsOn(9)}></button>
                <button style={initialHole} onClick={() => soundsOn(10)}></button>
            </div>
            {/* <button style={blowAir}>Blow Air</button> */}
        </div>
    );
}

export const _Flute = new Instrument("Flute", Flute);