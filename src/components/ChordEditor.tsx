import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Close, Check } from '@mui/icons-material';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Chord, ChordModification, NoteDuration, chordModifications, noteDuration as noteDurations } from '../type';
import { Button } from './UI/Button';
import { flexColumn } from './styles';

type EditableField = 'modification' | 'duration';

export type EditableChord = Pick<Chord, EditableField>

export interface DialogProps {
  open: boolean;
  chord: Chord;
  onSave: (chord: EditableChord) => void;
  onDiscard: () => void;
}

export const ChordEditor = (props: DialogProps) => {
  const { onSave: saveChord, chord, open, onDiscard } = props;

  const [editedChord, setEditedChord] = React.useState<EditableChord>(chord)

  const handleSave = () => {
    saveChord(editedChord);
  };

  const handleDiscard = () => {
    onDiscard();
  };

  const handleChange = (field: EditableField, value: NoteDuration | ChordModification) => {
    setEditedChord(prev => ({ ...prev, [field]: value }))
  };

  return (
    <Dialog
      onClose={handleDiscard}
      open={open}
    >
      <Box
        sx={{
          ...flexColumn,
          width: 200
        }}
      >
        <Box
          sx={{
            ...flexColumn,
            m: 1,
          }}
        >
          <FormControl>
            <InputLabel id='duration-label'>Duration</InputLabel>
            <Select
              labelId='duration-label'
              id='duration'
              value={editedChord.duration}
              label='Duration'
              onChange={(event: SelectChangeEvent<NoteDuration>) => {
                handleChange('duration', parseFloat(event.target.value as string) as NoteDuration)
              }}
            >
              {noteDurations.map(duration =>
                <MenuItem key={duration} value={duration}>{duration}</MenuItem>
              )}
            </Select>
          </FormControl>
          <FormControl >
            <InputLabel id='modifications-label'>Modifications</InputLabel>
            <Select
              labelId='modifications-label'
              id='modifications'
              value={editedChord.modification}
              label='Modifications'
              onChange={(event: SelectChangeEvent<ChordModification>) => {
                handleChange('modification', event.target.value as ChordModification)
              }}
            >
              {chordModifications.map(modification =>
                <MenuItem key={modification} value={modification}>{modification}</MenuItem>
              )}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Button
            onClick={onDiscard}
            sx={{ flex: 1, boxShadow: 'none', borderRadius: 0 }}
            color='error'
          ><Close /></Button>
          <Button
            onClick={handleSave}
            sx={{ flex: 1, boxShadow: 'none', borderRadius: 0 }}
            color='success'
          ><Check /></Button>
        </Box>
      </Box>
    </Dialog >
  );
}
