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
    <div className="flex flex-column h-25 bb b--light-gray pa3">
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
      <div className={classNames("f6 flex items-center black", { fw7: active })} onClick={onClick}>
        {active ? <RadioButtonChecked20 className="mr1" /> : <RadioButton20 className="mr1" />}
        <div className="dim">{text}</div>
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
          className="f6 pointer underline flex items-center no-underline i dim"
          onClick={() => dispatch(new DispatchAction("PLAY_SONG", { id: song.get("id") }))}
        >
          <Music20 className="mr1" />
          {song.get("songTitle")}
        </div>
      ))}
    </Section>
  );
}

function Player({ state }: SideNavProps): JSX.Element {
  const [songs, setSongs] = useState(["Empty"]);
  const [selected, setSelected] = useState("");
  useEffect(() => {
    setSongs(state.get("songs", List()).reduce((acc: any, song: any) => acc.concat([song.get("songTitle")]), [] as any[]));
  }, [state]);
  return (
    <Section title="Jukebox">
      <div className={classNames("pt2 shadow-6 ba bsblk bg-moon-gray pl0 pr0 pb3 pt1 dib-ns")}>
        <Combobox 
          hideCaret 
          hideEmptyPopup 
          placeholder="Search Song by Title" 
          data={songs} 
          value={selected} 
          onChange={(nextValue) => setSelected(nextValue)} 
        />
        <div className={classNames("tc-ns f8-ns b-m pt2 pb2 pl2-m pr2-m black")} 
             id="song_title">
          {selected}
        </div>
        <div className={classNames('ml3-ns pl1')}>
          <input
            className={classNames('mr1-ns b-m green bg-white-60 bsblk br3 pl2 pr2 pt3 pb3 tc no-underline dib-ns f5-ns mt00-m mb00-m ml00-m mr00-m pointer:hover')}
            id="play"
            type="button"
            value="Play"
            onClick={() => Play(state, selected, "play", true)}
          ></input>
          <input
            className={classNames('mr1-ns b-m black bg-white-60 bsblk br3 pl2 pr2 pt3 pb3 tc no-underline dib-ns f5-ns mt00-m mb00-m ml00-m mr00-m pointer:hover')}
            id="pause"
            type="button"
            value="Pause"
            onClick={() => Play(state, selected, "pause")}
          ></input>
          <input
            className={classNames('b-m red bg-white-60 bsblk br3 pl2 pr2 pt3 pb3 tc no-underline dib-ns f5-ns mt00-m mb00-m ml00-m mr00-m pointer:hover')}
            id="stop"
            type="button"
            value="Stop"
            onClick={() => Play(state, selected, "stop")}
          ></input>
        </div>

        <div className={classNames('ml2-ns pl2')}>
          <input className={classNames("ml1-ns mt1-ns mr1-ns br3")} 
                 id="record" 
                 type="button" 
                 value="Record"
          ></input>
          <input className={classNames("mt1-ns br3")} 
                 id="reset" 
                 type="button" 
                 value="Reset Song"
          ></input>
        </div>

        <div className={classNames('ml0-ns pl2')}>
          <form action="http://www.google.com">
            <input className={classNames("ml1-ns br2-m f4-m tc-l w-90 mt1-ns")} 
                   id="text" 
                   type="text" 
                   name="new_song_title" 
                   placeholder="Name Your Song"
            />
            <input className={classNames('ml1-ns txt_shdw_blk bg-light-blue dib-ns pl00-ns pr00-ns pt00-ns pb00-ns b--blue br3 white w-90-ns f5 tc-ns mt1-ns')}
              id="submit"
              type="button"
              value="submit"
            ></input>
          </form>
        </div>
      </div>
    </Section>
  );
}

export function SideNav({ state, dispatch }: SideNavProps): JSX.Element {
  return (
    <div className="absolute top-0 left-0 bottom-0 w5 z-1 shadow-1 bg-white flex flex-column">
      <div className="h3 fw7 f5 flex items-center pl3 bb b--light-gray">Treble with TS</div>
      <div className="flex-auto">
        <Instruments state={state} dispatch={dispatch} />
        <Visualizers state={state} dispatch={dispatch} />
        <Player state={state} dispatch={dispatch} />
        <Songs state={state} dispatch={dispatch} />
      </div>
    </div>
  );
}
