//default
import { useEffect, useState } from "react";

//3rd party
import * as Tone from "tone";
import classNames from "classnames";

//local
import { Instrument, InstrumentProps } from "../Instruments";
import { DispatchAction } from "../Reducer";

//imgs
import Bass from "../img/drums/bass.svg";
import Top_Left from "../img/drums/pip_stand.svg";
import Mini_Boom from "../img/drums/hmm.svg";
import smn from "../img/drums/smn_.svg";

//styling
import "./drums.css";
function Drums({ state, dispatch }: InstrumentProps): JSX.Element {
  const isRecording = state.get("isRecording");
  const recordedNotes = state.get("recordedNotes");
  const drum_boom = async (
    type_beat: number,
    overwriteStopRecording: boolean = false
  ) => {
    if (isRecording && !overwriteStopRecording)
      dispatch(new DispatchAction("ADD_NOTE", { note: type_beat.toString() }));
    let rsp_url = "http://localhost:5005/drums/?type_beat=" + type_beat;
    let rsp_data = await fetch(rsp_url);
    let rsp_json = await rsp_data.json();
    let audioSrc = "data:audo/wav;base64," + rsp_json.fileContent;
    let beat = new Tone.Player(audioSrc).toDestination();
    beat.autostart = true;
  };
  // do an insert on the backend with instrument drums
  useEffect(() => {
    if (!isRecording && recordedNotes.length > 0)
      dispatch(new DispatchAction("RECORD_COMPLETE"));
  }, [isRecording]);

  const currentlyPlayingSong = state.get("currentlyPlayingSong");
  const isSongPlaying = state.get("isSongPlaying");

  return (
    <div className={classNames("pt3")}>
      <div
        className={classNames(
          "h-inherit br4 pb2 bg-light-blue wfc justify-between shadow-6 center"
        )}
      >
        {" "}
        <div className="grid-container absolute-m" id="drum_container">
          <div className="grid-item pt3">
            <img
              src={Top_Left}
              alt="a"
              style={{
                height: 105,
                width: 125,
                marginTop: -10,
                transform: "rotate(20deg)",
              }}
              onClick={() => drum_boom(10)}
            />
            <img
              src={Mini_Boom}
              alt="d"
              style={{
                height: 105,
                width: 120,
                marginTop: -10,
                transform: "rotate(20deg)",
              }}
              onClick={() => drum_boom(5)}
            />
            <img
              src={Mini_Boom}
              alt="e"
              style={{
                height: 130,
                width: 150,
                marginTop: -10,
                marginLeft: -5,
                transform: "rotate(0)",
              }}
              onClick={() => drum_boom(12)}
            />
            <img
              src={Mini_Boom}
              alt="f"
              style={{
                height: 105,
                width: 120,
                marginTop: -10,
                marginLeft: -1,
                transform: "rotate(-20deg)",
              }}
              onClick={() => drum_boom(4)}
            />
            <img
              src={Top_Left}
              alt="c"
              style={{
                height: 105,
                width: 125,
                marginTop: -10,
                transform: "rotate(-20deg)",
              }}
              onClick={() => drum_boom(8)}
            />
          </div>
          <div className="grid-item pt3">
            <img
              src={Top_Left}
              alt="b"
              style={{ height: 150, width: 125, transform: "rotate(20deg)" }}
              onClick={() => drum_boom(6)}
            />
            <img
              src={smn}
              alt="g"
              style={{
                height: 150,
                width: 150,
                marginLeft: -20,
                transform: "rotate(0deg)",
              }}
              onClick={() => drum_boom(11)}
            />
            <img
              src={Bass}
              alt="h"
              style={{ height: 150, width: 150, marginLeft: -15 }}
              onClick={() => drum_boom(7)}
            />
            <img
              src={smn}
              alt="i"
              style={{
                height: 150,
                width: 150,
                marginLeft: -5,
                transform: "rotate(0deg)",
              }}
              onClick={() => drum_boom(9)}
            />
            <img
              src={Top_Left}
              alt="c"
              style={{
                height: 150,
                width: 125,
                marginLeft: -20,
                transform: "rotate(-20deg)",
              }}
              onClick={() => drum_boom(6)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export const _Drums = new Instrument("Drums", Drums);
