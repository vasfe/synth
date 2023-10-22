import React from 'react';
import { Keyboard, Chords } from './components';
import { useSynth } from './hooks/synth';
import { Container } from '@mui/material';

const App = (): JSX.Element => {
  // const { attack, release, playChords } = useSynth("FMSynth");

  return <Container
    maxWidth='md'
    sx={{
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column'
    }}
  >
    <Keyboard
      // onAttack={attack}
      // onRelease={release}
    />
    <Chords
      // play={playChords}
    />
  </Container>
}

export default App;
