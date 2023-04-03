import React, { KeyboardEventHandler, useEffect, useRef, useState } from "react"
import './keyboard.css';
import { Settings } from "../type";
import { KeyboardKey, Note, KeyboardMap, BlackKey, PianoKey } from "../type";

const keys: KeyboardKey[] = [
    "Q", "W", "E", "R", "T", "Y", "U",
    "I", "O", "P", "A", "S", "D", "F",
    "G", "H", "J", "K", "L", "Z", "X",
    "C", "V", "B", "N", "M"
];

const allNotes: Note[] = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

const keyboardMap: KeyboardMap = keys.reduce(
    (acc, cur, i) => (
        {
            ...acc,
            [cur]: {
                note: allNotes[i - (Math.floor(i / allNotes.length) * allNotes.length)],
                octave: Math.floor(i / allNotes.length) + 3
            }
        }
    ), {});

const isBlackKey = (key: string): key is BlackKey => key.includes("#");

const getKeyByNote = (key: PianoKey): KeyboardKey | undefined => (Object.keys(keyboardMap) as KeyboardKey[]).find((k: KeyboardKey) => keyboardMap[k]?.note === key.note && keyboardMap[k]?.octave === key.octave);

type KeyboardProps = {
    settings: Settings,
    onAttack: (key: string) => void,
    onRelease: (key: string) => void,
}

export const Keyboard = (props: KeyboardProps): JSX.Element => {
    const { settings:{displayKeys, displayNotes}, onAttack, onRelease } = props;
    const [disabledKeys, setDisabledKeys] = useState<PianoKey[]>([]);

    const keyboardRef = useRef<HTMLDivElement>(null);

    const handleKeyboardPress: KeyboardEventHandler<HTMLDivElement> = (event) => {
        const keyToProcess: PianoKey | undefined = keyboardMap[event.key.toUpperCase() as KeyboardKey];
        if (keyToProcess && !disabledKeys.includes(keyToProcess)) {
            handleAttack(keyToProcess)
        }
    }

    const handleKeyboardRelease: KeyboardEventHandler<HTMLDivElement> = (event) => {
        const keyToProcess: PianoKey | undefined = keyboardMap[event.key.toUpperCase() as KeyboardKey];
        if (keyToProcess && disabledKeys.includes(keyToProcess)) {
            handleRelease(keyToProcess)
        }
    }

    const handleMousePress = (key: PianoKey) => {
        if (!disabledKeys.includes(key)) {
            handleAttack(key)
        }
    }

    const handleMouseRelease = (key: PianoKey) => {
        handleRelease(key)
    }

    const handleAttack = (key: PianoKey): void => {
        setDisabledKeys(prev => [...prev, key]);
        onAttack(key.note + key.octave)
    }

    const handleRelease = (key: PianoKey): void => {
        setDisabledKeys(prev => prev.filter(n => n !== key));
        onRelease(key.note + key.octave)
    }

    useEffect(() => {
        if (keyboardRef.current) {
            keyboardRef.current.focus();
        }
    }, [])

    return <div
        className="keyboard"
        tabIndex={0}
        ref={keyboardRef}
        onKeyDown={handleKeyboardPress}
        onKeyUp={handleKeyboardRelease}
        autoFocus
    >
        {
            Object.entries(keyboardMap).filter(([_, value]) => !isBlackKey(value.note)).map(([key, value]) => {
                const blackKey = getKeyByNote({ note: value.note + "#" as Note, octave: value.octave })
                let sharpNote: PianoKey | undefined;
                if (blackKey && keyboardMap[blackKey]) {
                    sharpNote = keyboardMap[blackKey] as PianoKey;
                }
                return (
                    <div className="key-container">
                        <div
                            className={`key white ${disabledKeys.includes(value) ? 'pressed' : ''}`}
                            onMouseEnter={() => handleMousePress(value)}
                            onMouseLeave={() => handleMouseRelease(value)}
                        >
                            {displayKeys &&
                                <div className="key-label">
                                    {key}
                                </div>
                            }
                            {displayNotes &&
                                <div className="key-label">
                                    {value.note + value.octave}
                                </div>
                            }
                        </div>
                        {sharpNote &&
                            <div
                                className={`key black ${disabledKeys.includes(sharpNote) ? 'pressed' : ''}`}
                                onMouseEnter={() => {
                                    if (sharpNote) {
                                        handleAttack(sharpNote)
                                    }
                                }}
                                onMouseLeave={() => {
                                    if (sharpNote) {
                                        handleRelease(sharpNote)
                                    }
                                }}
                            >
                                {displayKeys &&
                                    <div className="key-label black">
                                        {blackKey}
                                    </div>
                                }
                                {displayNotes &&
                                    <div className="key-label black">
                                        {value.note + value.octave}
                                    </div>
                                }
                            </div>
                        }
                    </div>
                )
            })
        }
    </div>
}