export type KeyboardKey =
    "Q" | "W" | "E" | "R" | "T" | "Y" | "U" |
    "I" | "O" | "P" | "A" | "S" | "D" | "F" |
    "G" | "H" | "J" | "K" | "L" | "Z" | "X" |
    "C" | "V" | "B" | "N" | "M"

export type BlackKey = "C#" | "D#" | "F#" | "G#" | "A#"

export type WhiteKey = "C" | "D" | "E" | "F" | "G" | "A" | "B"

export type Note = BlackKey | WhiteKey;

export type PianoKey = {
    note: Note,
    octave: number
};

export type KeyboardMap = {
    [key in KeyboardKey]?: PianoKey
};

export type Settings = {
    displayNotes: boolean,
    displayKeys: boolean
  }