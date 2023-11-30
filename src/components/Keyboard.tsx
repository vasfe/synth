import React, { KeyboardEventHandler, useCallback, useEffect, useRef, useState } from "react"
import { Note } from "../type";
import { KeyboardKey, KeyboardMap, PianoKey } from "../type";
import Key from "./Key";
import { notes, } from "../notes";
import { useKeyboard } from "../hooks/keyboard";
import { useKeyboardSettings } from "../hooks/settings";
import { SettingsPane } from ".";
import { CollapsibleBox } from "./UI/CollapsibleBox";
import { Box } from "@mui/material";
import { flexColumn } from "./styles";
import { Straighten } from '@mui/icons-material';
import { useSynth } from "../hooks/synth";

const Keyboard = (): JSX.Element => {
    const { attack, release } = useSynth("FMSynth");

    const { settings, update } = useKeyboardSettings()
    const [pressedKeys, setPressedKeys] = useState<PianoKey[]>([]);
    const keyboardRef = useRef<HTMLDivElement>(null);
    const keyboardMap: KeyboardMap = useKeyboard(settings.octaves.value, settings.startingOctave.value);

    const getMappedShortcut = useCallback((note: Note): KeyboardKey | undefined => {
        const hasShortcut = Object.entries(keyboardMap).find(([_, key]) => note.note === key.note && key.octave === note.octave)
        if (hasShortcut) {
            return hasShortcut[0] as KeyboardKey;
        }
    }, [keyboardMap])

    const handleAttack = useCallback((key: PianoKey): void => {
        setPressedKeys(prev => [...prev, key]);
        attack([key.note + key.octave])
    }, [attack])

    const handleRelease = useCallback((key: PianoKey): void => {
        setPressedKeys(prev => prev.filter(n => n !== key));
        release([key.note + key.octave])
    }, [release])

    const handleKeyboardPress: KeyboardEventHandler<HTMLDivElement> = useCallback((event) => {
        const keyToProcess: PianoKey | undefined = keyboardMap[event.key.toUpperCase() as KeyboardKey];
        if (keyToProcess && !pressedKeys.includes(keyToProcess)) {
            handleAttack(keyToProcess)
        }
    }, [pressedKeys, handleAttack, keyboardMap])

    const handleKeyboardRelease: KeyboardEventHandler<HTMLDivElement> = useCallback((event) => {
        const keyToProcess: PianoKey | undefined = keyboardMap[event.key.toUpperCase() as KeyboardKey];
        if (keyToProcess && pressedKeys.includes(keyToProcess)) {
            handleRelease(keyToProcess)
        }
    }, [pressedKeys, handleRelease, keyboardMap])

    const handleMousePress = useCallback((key: PianoKey) => {
        if (!pressedKeys.includes(key)) {
            handleAttack(key)
        }
    }, [pressedKeys, handleAttack],)

    const handleMouseRelease = useCallback((key: PianoKey) => {
        handleRelease(key)
        setPressedKeys(pressedKeys.filter(k => k === key))
    }, [pressedKeys, handleRelease],)

    const buildPianoKeyBoard = useCallback((octave: number): PianoKey[] => {
        return notes.map((note) => ({
            note: note,
            octave: octave,
            duration: .5,
            isBlackKey: note.includes("#"),
            keyboardShortcut: getMappedShortcut({
                note: note,
                octave: octave
            })
        })
        )
    }, [getMappedShortcut])

    useEffect(() => {
        if (keyboardRef.current) {
            keyboardRef.current.focus();
        }
    }, [])

    return (
        <CollapsibleBox icon={<Straighten />}>
            <Box sx={{
                ...flexColumn,
                paddingBottom: 2
            }}>
                <SettingsPane
                    settings={settings}
                    onUpdateSettings={update}
                />
                <Box
                    tabIndex={0}
                    ref={keyboardRef}
                    onKeyDown={handleKeyboardPress}
                    onKeyUp={handleKeyboardRelease}
                    autoFocus
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        position: 'relative',
                        justifyContent: 'center'
                    }}
                >
                    {
                        Array.from(Array(settings.octaves.value), (_, i) => {
                            return <Box
                                sx={{
                                    display: 'flex',
                                    position: 'relative',
                                    height: 180,
                                    maxWidth: 800
                                }}
                                key={i}
                            >
                                {
                                    buildPianoKeyBoard(settings.startingOctave.value + i).map((note, i) => {
                                        return <Key
                                            pianoKey={note}
                                            settings={settings}
                                            isPressed={pressedKeys.find((n) => n.note === note.note && n.octave === note.octave) !== undefined}
                                            onPress={handleMousePress}
                                            onRelease={handleMouseRelease}
                                            key={i}
                                        />
                                    })
                                }
                            </Box>
                        })
                    }
                </Box >
            </Box>
        </CollapsibleBox >
    )
}

export default Keyboard;