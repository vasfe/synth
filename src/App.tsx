import React from 'react';
import { Keyboard, Chords } from './components';
import { Container } from '@mui/material';
import { flexColumn } from './components/styles';

const App = (): JSX.Element => {

  return <Container
    maxWidth='md'
    sx={flexColumn}
  >
    <Keyboard />
    {/* <Chords /> */}
  </Container>
}

export default App;
