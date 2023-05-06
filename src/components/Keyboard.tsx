import React, { KeyboardEventHandler, useCallback, useEffect, useRef, useState } from "react"
import { Note, Settings } from "../type";
import { KeyboardKey, KeyboardMap, PianoKey } from "../type";
import Key from "./Key";
import { notes, } from "../notes";
import { useKeyboard } from "../hooks/keyboard";

import './keyboard.css';

type KeyboardProps = {
    settings: Settings,
    onAttack: (key: string) => void,
    onRelease: (key: string) => void,
}

const Keyboard = (props: KeyboardProps): JSX.Element => {
    const { settings, onAttack, onRelease } = props;
    const [disabledKeys, setDisabledKeys] = useState<PianoKey[]>([]);
    const keyboardRef = useRef<HTMLDivElement>(null);
    const keyboardMap: KeyboardMap = useKeyboard(settings.octaves.value, settings.startingOctave.value);

    const getMappedShortcut = useCallback((note: Note, octave: number): KeyboardKey | undefined => {
        const hasShortcut = Object.entries(keyboardMap).find(([_, key]) => note === key.note && key.octave === octave)
        if (hasShortcut) {
            return hasShortcut[0] as KeyboardKey;
        }
    }, [keyboardMap])

    const handleAttack = useCallback((key: PianoKey): void => {
        setDisabledKeys(prev => [...prev, key]);
        onAttack(key.note + key.octave)
    }, [onAttack])

    const handleRelease = useCallback((key: PianoKey): void => {
        setDisabledKeys(prev => prev.filter(n => n !== key));
        onRelease(key.note + key.octave)
    }, [onRelease])

    const handleKeyboardPress: KeyboardEventHandler<HTMLDivElement> = useCallback((event) => {
        const keyToProcess: PianoKey | undefined = keyboardMap[event.key.toUpperCase() as KeyboardKey];
        if (keyToProcess && !disabledKeys.includes(keyToProcess)) {
            handleAttack(keyToProcess)
        }
    }, [disabledKeys, handleAttack, keyboardMap])

    const handleKeyboardRelease: KeyboardEventHandler<HTMLDivElement> = useCallback((event) => {
        const keyToProcess: PianoKey | undefined = keyboardMap[event.key.toUpperCase() as KeyboardKey];
        if (keyToProcess && disabledKeys.includes(keyToProcess)) {
            handleRelease(keyToProcess)
        }
    }, [disabledKeys, handleRelease, keyboardMap])

    const handleMousePress = useCallback((key: PianoKey) => {
        if (!disabledKeys.includes(key)) {
            handleAttack(key)
        }
    }, [disabledKeys, handleAttack],)

    const handleMouseRelease = useCallback((key: PianoKey) => {
            handleRelease(key)
            setDisabledKeys(disabledKeys.filter(k => k === key))
    }, [disabledKeys, handleRelease],)

    const buildPianoKeyBoard = useCallback((octave: number): PianoKey[] => {
        return notes.map((note) => ({
            note: note,
            octave: octave,
            isBlackKey: note.includes("#"),
            keyboardShortcut: getMappedShortcut(note, octave)
        })
        )
    }, [getMappedShortcut])

    useEffect(() => {
        if (keyboardRef.current) {
            keyboardRef.current.focus();
        }
    }, [])

    return (
        <div
            className="keyboard"
            tabIndex={0}
            ref={keyboardRef}
            onKeyDown={handleKeyboardPress}
            onKeyUp={handleKeyboardRelease}
            autoFocus
        >
            {
                Array.from(Array(settings.octaves.value), (_, i) => {
                    return <div className='keyboardRow'>
                        {
                            buildPianoKeyBoard(settings.startingOctave.value + i).map((note) => {
                                return <Key
                                    note={note}
                                    settings={settings}
                                    isPressed={disabledKeys.find((n) => n.note === note.note && n.octave === note.octave) !== undefined}
                                    onPress={handleMousePress}
                                    onRelease={handleMouseRelease}
                                />
                            })
                        }
                    </div>
                })
            }
        </div >
    )
}

export default Keyboard;