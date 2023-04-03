import React, { useState } from 'react';
import * as Tone from 'tone'
import { Keyboard } from './components/Keyboard';
import { Settings } from './type';

const formatLabel = (str: string): string => {
  const result = str.replace(/([A-Z])/g, " $1");
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
}

const synth = new Tone.PolySynth().toDestination();

const App = (): JSX.Element => {

  const [settings, setSettings] = useState<Settings>({
    displayNotes: false,
    displayKeys: true
  })

  const attack = (key: string) => {
    synth.triggerAttack(key)
  }

  const release = (key: string) => {
    synth.triggerRelease([key], Tone.now())
  }

  return <div>
    <div className="settings">
      {Object.entries(settings).map(([key, setting]) =>
        <div>
          <label>
            {formatLabel(key)}
          </label>
          <input
            type='checkbox'
            checked={setting}
            onChange={() => setSettings({ ...settings, [key]: !setting })}
          />
        </div>
      )}
    </div>
    <Keyboard
      onAttack={attack}
      onRelease={release}
      settings={settings}
    />

  </div>
}

export default App;