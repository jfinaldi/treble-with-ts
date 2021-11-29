// 3rd party library imports
import * as Tone from "tone";
import classNames from "classnames";
import { List, Range } from "immutable";
import React, { useEffect, useState } from "react";

// project imports
import { Instrument, InstrumentProps } from "../Instruments";

import "./harp.css";

const buildStringComponent = (
  id: string,
  note: string,
  sampler: Tone.Sampler,
  stringColor: "red" | "blue" | "black",
  paddingTop: number
) => {
  return (
    <div
      className="stringContainer"
      style={{
        marginTop: paddingTop * 5,
      }}
    >
      <div
        id={id}
        className="string"
        style={{
          borderLeftColor: stringColor,
        }}
        onMouseOver={(eve) => {
          if (document.hasFocus()) {
            sampler.triggerAttack(note);
            sampler.triggerRelease("+0.01");
          }
        }}
      ></div>
    </div>
  );
};

function Harp({ synth, setSynth }: InstrumentProps): JSX.Element {
  const [harpComponent, setHarpComponent]: [JSX.Element[], any] = useState([]);
  const [sampler, setSampler]: [Tone.Sampler | undefined, any] = useState();
  useEffect(() => {
    setSampler(() =>
      new Tone.Sampler({
        urls: mp3FileUrls,
        release: 1,
        baseUrl:
          "https://xo28122000.github.io/tonejs-instruments/samples/harp/",
      }).toDestination()
    );
  }, []);

  useEffect(() => {
    if (sampler) {
      const keyNotes = Object.keys(mp3FileUrls);
      const initHarpComponent: JSX.Element[] = keyNotes
        .sort((a, b) => parseInt(a.charAt(1)) - parseInt(b.charAt(1)))
        .map((note, i) =>
          buildStringComponent(
            "string-" + note,
            note,
            sampler,
            (i + 1) % 8 === 0 || i === 0 || i === keyNotes.length - 1
              ? "red"
              : (i + 1) % 4 === 0
              ? "blue"
              : "black",
            i < Math.floor((1.5 * keyNotes.length) / 2)
              ? i
              : Math.floor((1.5 * keyNotes.length) / 2) -
                  (i - Math.floor((1.5 * keyNotes.length) / 2))
          )
        );
      setHarpComponent(initHarpComponent);
    }
  }, [sampler]);

  const [isWindowBlured, setIsWindowBlured] = useState(!document.hasFocus());
  useEffect(() => {
    window.onfocus = () => {
      setIsWindowBlured(false);
    };

    window.onblur = () => {
      setIsWindowBlured(true);
    };
  }, []);

  return (
    <div className="pv4">
      <div
        id="harp-container"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          cursor: "grab",
        }}
      >
        {harpComponent}
      </div>
      {isWindowBlured && (
        <div className="overShadow">
          Please click anywhere on the screen to continue
        </div>
      )}
    </div>
  );
}

export const HarpInstrument = new Instrument("Harp", Harp);

const mp3FileUrls: { [name: string]: string } = {
  C5: "C5.mp3",
  D2: "D2.mp3",
  D4: "D4.mp3",
  D6: "D6.mp3",
  D7: "D7.mp3",
  E1: "E1.mp3",
  E3: "E3.mp3",
  E5: "E5.mp3",
  F2: "F2.mp3",
  F4: "F4.mp3",
  F6: "F6.mp3",
  F7: "F7.mp3",
  G1: "G1.mp3",
  G3: "G3.mp3",
  G5: "G5.mp3",
  A2: "A2.mp3",
  A4: "A4.mp3",
  A6: "A6.mp3",
  B1: "B1.mp3",
  B3: "B3.mp3",
  B5: "B5.mp3",
  B6: "B6.mp3",
  C3: "C3.mp3",
};
