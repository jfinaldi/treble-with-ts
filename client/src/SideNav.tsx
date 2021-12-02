import React, { useState, useEffect } from "react";
// 3rd party library imports
import classNames from "classnames";
import { List, set } from "immutable";
import { useLocation, Link } from "react-router-dom";
import { RadioButton20, RadioButtonChecked20, Music20 } from "@carbon/icons-react";
import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";

// project imports
import { DispatchAction } from "./Reducer";
import { AppState } from "./State";
import { Instrument } from "./Instruments";
import { Visualizer } from "./Visualizers";
import { Play } from "./Play";

/** ------------------------------------------------------------------------ **
 * All the components in the side navigation.
 ** ------------------------------------------------------------------------ */

interface SideNavProps {
  state: AppState;
  dispatch: React.Dispatch<DispatchAction>;
}

const Section: React.FC<{ title: string }> = ({ title, children }) => {
  return (
    <div className="flex flex-column h-auto bb b--light-gray pa3 txt_shdw_bld">
      <div className="fw7 mb2">{title} </div>
      <div className="flex-auto overflow-scroll">{children}</div>
    </div>
  );
};

interface RadioButtonProps {
  to: any;
  text: string;
  active: boolean;
  onClick: () => void;
}

function RadioButton({ to, text, active, onClick }: RadioButtonProps): JSX.Element {
  return (
    <Link to={to} className="no-underline">
      <div className={classNames("f6 flex items-center light-silver txt_shdw_bld", { fw7: active })} onClick={onClick}>
        {active ? <RadioButtonChecked20 className="mr1 near-white txt_shdw_bld" /> : <RadioButton20 className="mr1" />}
        <div className="dim near-white txt_shdw_bld">{text}</div>
      </div>
    </Link>
  );
}

function Instruments({ state }: SideNavProps): JSX.Element {
  const instruments: List<Instrument> = state.get("instruments");
  const activeInstrument = state.get("instrument")?.name;
  const location = useLocation();

  return (
    <Section title="Instruments">
      {instruments.map((i) => (
        <RadioButton key={i.name} to={`/${i.name}${location.search}`} text={i.name} active={i.name === activeInstrument} onClick={() => console.log(i.name)} />
      ))}
    </Section>
  );
}

function Visualizers({ state }: SideNavProps): JSX.Element {
  const visualizers: List<Visualizer> = state.get("visualizers");
  const activeVisualizer = state.get("visualizer")?.name;
  const location = useLocation();

  return (
    <Section title="Visualizers">
      {visualizers.map((v) => (
        <RadioButton
          key={v.name}
          to={{
            pathname: location.pathname,
            search: `?visualizer=${v.name}`,
          }}
          text={v.name}
          active={v.name === activeVisualizer}
          onClick={() => console.log(v.name)}
        />
      ))}
    </Section>
  );
}

function Songs({ state, dispatch }: SideNavProps): JSX.Element {
  const songs: List<any> = state.get("songs", List());
  return (
    <Section title="Playlist">
      {songs.map((song) => (
        <div
          key={song.get("id")}
          className="f6 pointer underline flex items-center no-underline i dim txt_shdw_bld"
          onClick={() => dispatch(new DispatchAction("PLAY_SONG", { id: song.get("songId") }))}
        >
          <Music20 className="mr1" />
          {song.get("name")}
        </div>
      ))}
    </Section>
  );
}

function Player({ state, dispatch }: SideNavProps): JSX.Element {
  const isComplete = state.get("isComplete");
  const [songs, setSongs] = useState(["Empty"]);
  const [selected, setSelected] = useState("");
  const [notes, setNotes] = useState("");
  const [artist, setArtist] = useState("");
  const [songName, setSongName] = useState("");
  const submitForm = () => {
    const postRequest = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recordedNotes: notes, songName: songName, artist: artist }),
    };
    console.log("JSON", postRequest);
  };
  useEffect(() => {
    const recordedNotes = JSON.parse(JSON.stringify(state.get("recordedNotes")));
    setNotes(recordedNotes);
    dispatch(new DispatchAction("CLEAR_NOTES"));
  }, [isComplete]);
  useEffect(() => {
    setSongs(state.get("songs", List()).reduce((acc: any, song: any) => acc.concat([song.get("name")]), [] as any[]));
  }, [state]);
  return (
    <div>
      <Section title="Jukebox">
        <div className={classNames("pt2 shadow-6 ba bsblk bg-moon-gray pl0 pr0 pb3 pt1 dib-ns txt_shdw_none")}>
          <Combobox hideCaret hideEmptyPopup placeholder="Search Song by Title" data={songs} value={selected} onChange={(nextValue) => setSelected(nextValue)} />
          <div className={classNames("tc-ns f8-ns pt1 pb1 pl2-m pr2-m black")} id="song_title">
            {selected}
          </div>
          <div className={classNames("ml3-ns pl1")}>
            <input
              className={classNames("w-45 h2 mr1-ns b-m green bg-white-60 bsblk br3 pl2 pr2 pt1 pb3 no-underline dib-ns f5-ns mt00-m mb00-m ml00-m mr00-m pointer:hover")}
              id="play"
              type="button"
              value="Play"
              onClick={() => {
                const getId = state
                  .get("songs")
                  .find((t: any) => t.get("name") === selected)
                  .get("songId");
                dispatch(new DispatchAction("PLAY_SONG", getId));
              }}
            ></input>
            <input
              className={classNames("w-45 h2 b-m red bg-white-60 bsblk br3 pl2 pr2 pt1 pb3 no-underline dib-ns f5-ns mt00-m mb00-m ml00-m mr00-m pointer:hover")}
              id="stop"
              type="button"
              value="Stop"
              onClick={() => Play(state, selected, "stop")}
            ></input>
          </div>

          <div className={classNames("ml2-ns pl2")}>
            <input
              className={classNames("ml1-ns mt1-ns mr1-ns w-40 br3")}
              id="record"
              type="button"
              value={state.get("isRecording") ? "Stop Recording" : "Record"}
              onClick={() => {
                dispatch(new DispatchAction("TOGGLE_RECORDING"));
              }}
            ></input>
            <input className={classNames("mt1-ns br3 ml00-ns")} id="reset" type="button" value="Reset Song"></input>
          </div>

          <div className={classNames("ml0-ns pl2")}>
            <form action="http://www.google.com">
              <input
                className={classNames("tc ml2-ns br2-m f5-m tc-l w-90 mt1-ns")}
                id="text"
                type="text"
                name="new_song_title"
                placeholder="Name Your Song"
                onChange={(e) => setSongName(e.target.value)}
              />
              <input
                className={classNames("tc ml2-ns br2-m f5-m tc-l w-90 mt1-ns")}
                id="text"
                type="text"
                name="new_song_artist"
                placeholder="Your Name Here"
                onChange={(e) => setArtist(e.target.value)}
              />

              <input
                className={classNames("ml2-ns txt_shdw_blk bg-light-blue dib-ns pl00-ns pr00-ns pt00-ns pb00-ns b--blue br3 white w-90-ns f5 tc-ns mt1-ns")}
                id="submit"
                type="button"
                value="submit"
                onClick={() => submitForm()}
              ></input>
            </form>
          </div>
        </div>
      </Section>
    </div>
  );
}

export function SideNav({ state, dispatch }: SideNavProps): JSX.Element {
  return (
    // <div className="absolute top-0 left-0 bottom-0 w5 z-1 shadow-1 bg-white flex flex-column">
    <div className="absolute top-0 left-0 bottom-0 w5 z-1 shadow-3 bg-mid-gray near-white flex flex-column">
      {/* <div className="h3 fw7 f5 flex items-center pl3 bb b--light-gray">Treble with TS</div> */}
      <div className="h3 fw7 f5 flex items-center pl3 bb b--silver txt_shdw_bld">Treble with TS</div>
      <div className="flex-auto">
        <Instruments state={state} dispatch={dispatch} />
        <Visualizers state={state} dispatch={dispatch} />
        <Player state={state} dispatch={dispatch} />
        <Songs state={state} dispatch={dispatch} />
      </div>
    </div>
  );
}
