import * as Tone from "tone";
import { Instrument } from "../Instruments";

const flute = {
    width: "1000px",
    height: "100px",
    borderRadius: "50px/25px",
    backgroundColor: "rgba(160, 160, 160, 0.5)",
    cursor: `url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/9632/meh.png"), auto`,
  };

function Flute(): JSX.Element {

    const soundsOn = async (soundType: number) => {

    }
    return(
        <div>
            <div style={flute}></div>
        </div>
    );
}

export const _Flute = new Instrument("Flute", Flute);