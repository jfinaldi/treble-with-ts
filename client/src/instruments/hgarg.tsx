import { NonCertified16 } from "@carbon/icons-react";
import * as Tone from "tone";
import { Instrument } from "../Instruments";

const buttonStyle = {
  padding: "10px",
  width: "60px",
  fontSize: "24px",
  border: "none",
  color: "white",
  borderRadius: "5px",
  marginRight: "15px",
  cursor: "pointer",
};

const h1 = {
  height: "200px",
  backgroundColor: "#660033",
};

const h2 = {
  height: "185px",
  backgroundColor: "#00CCCC",
};

const h3 = {
  height: "170px",
  backgroundColor: "#006666",
};

const h4 = {
  height: "155px",
  backgroundColor: "#666600",
};

const h5 = {
  height: "140px",
  backgroundColor: "#B2FF66",
};

const h6 = {
  height: "125px",
  backgroundColor: "#003366",
};

const h7 = {
  height: "110px",
  backgroundColor: "#FF8000",
};

const h8 = {
  height: "95px",
  backgroundColor: "#FF0000",
};

const xylophone = {
  width: "600px",
  // marginLeft: "250px",
  marginLeft: "50px",

  // NEW
  marginBottom: "50px",
  marginTop: "50px",
  marginUp: "100px",
};

const connector = {
  width: "600px",
  height: "20px",
  backgroundColor: "#663300",
  marginTop: "100px",
};

function XyloPhone(): JSX.Element {
  const soundsOn = async (soundType: number) => {
    let url = "http://localhost:5005/xylophone/?xylophone_sound=" + soundType;
    let data = await fetch(url);
    let resJson = await data.json();
    let audioSrc = "data:audo/wav;base64," + resJson.fileContent;
    let beat = new Tone.Player(audioSrc).toDestination();
    beat.autostart = true;
  };
  return (
    <div style={xylophone}>
      <div
        style={{
          width: "585px",
          height: "21px",
          backgroundColor: "#663300",
          marginTop: "135px",
          marginBottom: "-110px",
          zIndex: 1,
        }}
      />
      <div>
        <button style={{ ...buttonStyle, ...h1, zIndex: 100 }} onClick={() => soundsOn(1)}>
          c
        </button>
        <button style={{ ...buttonStyle, ...h2 }} onClick={() => soundsOn(2)}>
          d1
        </button>
        <button style={{ ...buttonStyle, ...h3 }} onClick={() => soundsOn(3)}>
          e1
        </button>
        <button style={{ ...buttonStyle, ...h4 }} onClick={() => soundsOn(4)}>
          f
        </button>
        <button style={{ ...buttonStyle, ...h5 }} onClick={() => soundsOn(5)}>
          g
        </button>
        <button style={{ ...buttonStyle, ...h6 }} onClick={() => soundsOn(6)}>
          a
        </button>
        <button style={{ ...buttonStyle, ...h7 }} onClick={() => soundsOn(7)}>
          b
        </button>
        <button style={{ ...buttonStyle, ...h8 }} onClick={() => soundsOn(8)}>
          c2
        </button>
      </div>
    </div>
  );
}

export const _Xylophone = new Instrument("Xylophone", XyloPhone);
