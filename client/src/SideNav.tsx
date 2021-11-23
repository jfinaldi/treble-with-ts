// 3rd party library imports
import classNames from 'classnames';
import { List } from 'immutable';
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  RadioButton20,
  RadioButtonChecked20,
  Music20,
} from '@carbon/icons-react';

// project imports
import { DispatchAction } from './Reducer';
import { AppState } from './State';
import { Instrument } from './Instruments';
import { Visualizer } from './Visualizers';


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
  to: any,
  text: string,
  active: boolean,
  onClick: () => void
}

function RadioButton({ to, text, active, onClick }: RadioButtonProps): JSX.Element {
  return (
    <Link to={to} className="no-underline">
      <div
        className={classNames('f6 flex items-center black', { fw7: active })}
        onClick={onClick}
      >
        {active ? (
          <RadioButtonChecked20 className="mr1" />
        ) : (
          <RadioButton20 className="mr1" />
        )}
        <div className="dim">{text}</div>
      </div>
    </Link>
  );
}

function Instruments({ state }: SideNavProps): JSX.Element {
  const instruments: List<Instrument> = state.get('instruments');
  const activeInstrument = state.get('instrument')?.name;
  const location = useLocation();

  return (
    <Section title="Instruments">
      {instruments.map(i => (
        <RadioButton
          key={i.name}
          to={`/${i.name}${location.search}`}
          text={i.name}
          active={i.name === activeInstrument}
          onClick={() => console.log(i.name)}
        />
      ))}
    </Section>
  );
}

function Visualizers({ state }: SideNavProps): JSX.Element {
  const visualizers: List<Visualizer> = state.get('visualizers');
  const activeVisualizer = state.get('visualizer')?.name;
  const location = useLocation();

  return (
    <Section title="Visualizers">
      {visualizers.map(v => (
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
  const songs: List<any> = state.get('songs', List());
  return (
    <Section title="Playlist">
      {songs.map(song => (
        <div
          key={song.get('id')}
          className="f6 pointer underline flex items-center no-underline i dim"
          onClick={() =>
            dispatch(new DispatchAction('PLAY_SONG', { id: song.get('id') }))
          }
        >
          <Music20 className="mr1" />
          {song.get('songTitle')}
        </div>
      ))}
    </Section>
  );
}

function Player({ state, dispatch}: SideNavProps): JSX.Element {
  return (
    <Section title="Jukebox">
      <div className={classNames('ba bsblk bg-moon-gray pl3 pr3 pb3 pt1 dib-ns')}>
        <div>
	        <form action="http://www.google.com">
    	      <input className={classNames('br2-m f4-m tc-l w-75')} 
                   id="text" type="text" name="song_title" 
                   placeholder="Search Song by Title"/>
            <input className={classNames('txt_shdw_blk ml1 bg-light-green dib-ns pl00-ns pr00-ns pt00-ns pb00-ns b--diarreen br3 white w-20 f4 tc-ns')}
                   id="go" type="button" value="Go"></input>
          </form>    
        </div>
        <div className={classNames('tc-ns f4-ns b-m pt2 pb2 pl2-m pr2-m black')} 
             id="song_title">"Ode to Joy"</div>
        <input className={classNames('b-m green bg-white-60 bsblk br3 pl2 pr2 pt3 pb3 tc no-underline dib-ns f5-ns mt00-m mb00-m ml00-m mr00-m pointer:hover')}
             id="play" type="button" value="Play"></input>
        <input className={classNames('b-m black bg-white-60 bsblk br3 pl2 pr2 pt3 pb3 tc no-underline dib-ns f5-ns mt00-m mb00-m ml00-m mr00-m pointer:hover')}
             id="pause" type="button" value="Pause"></input>
        <input className={classNames('b-m red bg-white-60 bsblk br3 pl2 pr2 pt3 pb3 tc no-underline dib-ns f5-ns mt00-m mb00-m ml00-m mr00-m pointer:hover')}
             id="stop" type="button" value="Stop"></input>
      </div>
    </Section>
  );
}

export function SideNav({ state, dispatch }: SideNavProps): JSX.Element {
  return (
    <div className="absolute top-0 left-0 bottom-0 w5 z-1 shadow-1 bg-white flex flex-column">
      <div className="h3 fw7 f5 flex items-center pl3 bb b--light-gray">
        Treble with TS
      </div>
      <div className="flex-auto">
        <Instruments state={state} dispatch={dispatch} />
        <Visualizers state={state} dispatch={dispatch} />
        <Songs state={state} dispatch={dispatch} />
        <Player state={state} dispatch={dispatch} />
      </div>
    </div>
  );
}
