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

    }
    return(
        <div>
            <div style={flute}>
                <div style={initialHole}></div>
                <button style={hole}></button>
                <button style={initialHole}></button>
                <button style={initialHole}></button>
                <button style={initialHole}></button>
                <button style={initialHole}></button>
                <button style={initialHole}></button>
                <button style={initialHole}></button>
                <button style={initialHole}></button>
                <button style={initialHole}></button>
            </div>
            <button style={blowAir}>Blow Air</button>
        </div>
    );
}

export const _Flute = new Instrument("Flute", Flute);