import { KeyboardKey, KeyboardMap } from "../type";
import { notes } from "../notes";
import { useMemo } from "react";

const keys: KeyboardKey[] = [
 "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=",
    "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "#",
    "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'",
    "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"
];

export const useKeyboard = (octaves: number, startOctave: number): KeyboardMap => {
    const keyboardMap = useMemo(() => {
        let map: KeyboardMap = {};
        let i = 0;
        while (octaves * notes.length > i && keys.length > i) {
            map[keys[i]] = { 
                note: notes[i - (Math.floor(i / notes.length) * notes.length)],
                octave: Math.floor(i / notes.length) + startOctave,
                isBlackKey: notes[i - (Math.floor(i / notes.length) * notes.length)].includes("#")
            };
            i++
        }
        return map;
    }, [octaves, startOctave])
    return keyboardMap;
} 