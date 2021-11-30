import * as Tone from "tone";
import Bass from "../img/drums/bass.svg";
import Top_Left from "../img/drums/pip_stand.svg";
import Mini_Boom from "../img/drums/hmm.svg";
import smn from "../img/drums/smn_.svg";
import { useEffect, useState } from "react";
import { Instrument, InstrumentProps } from "../Instruments";
import "./drums.css";
import { Automatic16 } from "@carbon/icons-react";
import classNames from "classnames";
import { DispatchAction } from "../Reducer";

function Drums({ state, dispatch }: InstrumentProps): JSX.Element {
  const [record, setRecord] = useState(false);
  const [track, setTrack] = useState([] as any[]);
  const clear = () => setTrack([]);
  const save = () => console.log(track); //TODO: POST Request to Backend
  const drum_boom = async (type_beat: number) => {
    if (isRecording) {
      // setTrack([...track, type_beat]);
      dispatch(new DispatchAction("ADD_NOTE", { note: type_beat }));
    }
    let rsp_url = "http://localhost:5005/drums/?type_beat=" + type_beat;
    let rsp_data = await fetch(rsp_url);
    let rsp_json = await rsp_data.json();
    let audioSrc = "data:audo/wav;base64," + rsp_json.fileContent;
    let beat = new Tone.Player(audioSrc).toDestination();
    beat.autostart = true;
  };
  const isRecording = state.get("isRecording");
  const recordedNotes = state.get("recordedNotes");
  useEffect(() => {
    if (!isRecording && recordedNotes.length > 0) {
      // do an insert on the backend with instrument drums
      // clear the notes array
      dispatch(new DispatchAction("CLEAR_NOTES"));
    }
  }, [isRecording]);
  useEffect(() => {
    console.log("recordedNotes changed: ", recordedNotes);
  }, [recordedNotes]);
  return (
    <div className={classNames("pt4")}>
      {/*NEW */}
      {/* <div> */}
      {/** RECORD Component INSERT HERE */}
      {/* <button onClick={() => setRecord(true)}>Record</button>
      <button onClick={() => setRecord(false)}>Stop Record</button>
      <button onClick={() => clear()}>Clear</button>
      <button onClick={() => save()}>Save</button> */}
      {/** RECORD Component INSERT HERE */}
      <div
        className={classNames(
          "h-inherit br4 pb2 bg-light-blue w-75 justify-between shadow-6 center "
        )}
      >
        {" "}
        {/*NEW */}
        <div className="drum_container">
          <img
            src={Top_Left}
            alt="a"
            style={{ height: 200, width: 150, transform: "rotate(20deg)" }}
            onClick={() => drum_boom(4)}
          />
          <img
            src={Mini_Boom}
            alt="b"
            style={{ height: 150, width: 150, transform: "rotate(0)" }}
            onClick={() => drum_boom(5)}
          />
          <img
            src={Top_Left}
            alt="c"
            style={{ height: 150, width: 150, transform: "rotate(-20deg)" }}
            onClick={() => drum_boom(6)}
          />
          <img
            src={Mini_Boom}
            alt="d"
            style={{ height: 120, width: 120, transform: "rotate(20deg)" }}
            onClick={() => drum_boom(7)}
          />
          <img
            src={smn}
            alt="e"
            style={{ height: 150, width: 150, transform: "rotate(0deg)" }}
            onClick={() => drum_boom(8)}
          />
          <img
            src={Mini_Boom}
            alt="f"
            style={{ height: 120, width: 120, transform: "rotate(-20deg)" }}
            onClick={() => drum_boom(9)}
          />
          <img
            src={smn}
            alt="g"
            style={{ height: 150, width: 150, transform: "rotate(0deg)" }}
            onClick={() => drum_boom(10)}
          />
          <img
            src={Bass}
            alt="k"
            style={{ height: 150, width: 150 }}
            onClick={() => drum_boom(11)}
          />
          <img
            src={smn}
            alt="m"
            style={{ height: 150, width: 150, transform: "rotate(0deg)" }}
            onClick={() => drum_boom(12)}
          />
        </div>
      </div>
    </div>
  );
}

export const _Drums = new Instrument("Drums", Drums);
