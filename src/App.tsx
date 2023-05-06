import React from 'react';
import * as Tone from 'tone'
import { Keyboard, SettingsPane } from './components';
import { useSettings } from './hooks';

const synth = new Tone.PolySynth().toDestination();

const App = (): JSX.Element => {
  const {settings, update} = useSettings()

  const attack = (key: string) => synth.triggerAttack(key)
  const release = (key: string) => synth.triggerRelease([key], Tone.now())
  
  return <>
    <SettingsPane
      settings={settings}
      onUpdateSettings={update}
    />
    <Keyboard
      onAttack={attack}
      onRelease={release}
      settings={settings}
    />
  </>
}

export default App;