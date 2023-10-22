import React, { useCallback, useState } from 'react'
import { notes } from '../notes';
import { useChordsSettings } from '../hooks/settings';
import { CollapsibleBox, Sortable, SortableContainer } from './UI';
import { BasicNotes, Chord as ChordType } from '../type';
import { Box, Container } from '@mui/material';
import { SettingsPane } from '.';
import { PlayArrow, Stop } from '@mui/icons-material';
import { Button } from './UI';
import { ChordEditor, EditableChord } from './ChordEditor';
import { getNoteDurationInSeconds } from '../utils';
import { flexColumn } from './styles';
import { Chord, ChordProps } from './Chord';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import { useSynth } from '../hooks/synth';

type ChordsProps = {
    // play: (chords: ChordType[], tempo: number) => void,
}

const Chords = (props: ChordsProps): JSX.Element => {
    const { playChords: play } = useSynth("FMSynth");

    const [playing, setPlaying] = useState<boolean>(false);
    const [loop, setLoop] = useState<NodeJS.Timer | undefined>();
    const { settings, update } = useChordsSettings();
    const [chords, setChords] = useState<ChordType[]>([])
    const [editorOpen, setEditorOpen] = useState<boolean>(false)
    const [selectedChord, setSelectedChord] = useState<ChordType | undefined>(undefined)
    const [activeChord, setActiveChord] = useState<ChordType | undefined>(undefined)

    const handleSave = useCallback((chord: EditableChord) => {
        if (selectedChord) {
            const index = chords.indexOf(selectedChord)
            // use es2023 toSpliced()
            const copy = [...chords];
            copy.splice(index, 1, { ...selectedChord, ...chord });
            setChords(copy)
            setEditorOpen(false)
        }
    }, [chords, selectedChord])

    const handleDiscard = () => {
        setActiveChord(undefined)
        setEditorOpen(false)
    }

    const handleClick = useCallback((note: BasicNotes) => {
        setChords(prev =>
            [
                ...prev,
                {
                    root: {
                        note: note,
                        octave: settings.startingOctave.value
                    },
                    modification: '',
                    duration: 1
                }
            ]
        )
    }, [settings.startingOctave.value])

    const startEdit = (chord: ChordType) => {
        setSelectedChord(chord)
        setEditorOpen(true)
    }

    const moveChord = useCallback((dragIndex: number, hoverIndex: number) => {
        setChords(prev => {
            const copy = [...prev]
            copy.splice(dragIndex, 1);
            copy.splice(hoverIndex, 0, prev[dragIndex]);
            return copy
        })
    }, [])

    const triggerChordsAnimation = useCallback(() => {
        let delay = 0;
        setActiveChord(chords[0]);
        for (let i = 1; i < chords.length; i++) {
            setTimeout(() => setActiveChord(chords[i]), delay * 1000)
            delay += chords[i].duration
        }
    }, [chords])

    const stopPlay = useCallback((): void => {
        setPlaying(false)
        setActiveChord(undefined)
        clearInterval(loop);
    }, [loop])

    const playChords = useCallback(() => {
        setPlaying(true)
        const loopResetSeconds = chords.reduce((agg: number, chord) => agg + getNoteDurationInSeconds(chord.duration, settings.tempo.value), 0)
        triggerChordsAnimation()
        setLoop(setInterval(() => { triggerChordsAnimation() }, loopResetSeconds * 1000))
        play(chords, settings.tempo.value)
    }, [chords, play, settings.tempo.value, triggerChordsAnimation])

    return (
        <CollapsibleBox icon={<ViewWeekIcon />}>
            <Box sx={{ ...flexColumn }}>
                <SettingsPane
                    settings={settings}
                    onUpdateSettings={update}
                />
                <Container
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            flexWrap: 'wrap',
                            gap: .5,
                        }}
                    >
                        {notes.map((note, i) =>
                            <Button
                                key={i}
                                sx={{ width: 40, height: 40, fontSize: 18 }}
                                onClick={() => handleClick(note)}
                            >
                                {note}
                            </Button>
                        )}
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: .5,
                            borderRadius: 5,
                            border: '2px solid gray',
                            m: 1,
                            alignItems: 'center',
                            minWidth: 300
                        }}
                    >
                        <Button onClick={playing ? stopPlay : playChords}>
                            {playing ? <Stop color='warning' /> : <PlayArrow color='info' />}
                        </Button>
                        <SortableContainer
                            onMove={moveChord}
                            source={chords}
                        >
                            {chords.map((chord, i) =>
                                <Chord
                                    remove={() => setChords(prev => prev.filter(ch => chord !== ch))}
                                    edit={() => startEdit(chord)}
                                    chord={chord}
                                    active={activeChord === chord}
                                    id={i} />
                            )}
                        </SortableContainer>
                    </Box>
                </Container>
                {selectedChord && editorOpen &&
                    <ChordEditor
                        open={editorOpen}
                        chord={selectedChord}
                        onSave={handleSave}
                        onDiscard={handleDiscard}
                    />
                }
            </Box >
        </CollapsibleBox >
    )
}

export default Chords;