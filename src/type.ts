export type KeyboardKey =
    "`" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "0" | "-" | "=" |
    "Q" | "W" | "E" | "R" | "T" | "Y" | "U" | "I" | "O" | "P" | "[" | "]" | "#" |
    "A" | "S" | "D" | "F" | "G" | "H" | "J" | "K" | "L" | ";" | "'" |
    "Z" | "X" | "C" | "V" | "B" | "N" | "M" | "," | "." | "/"


export type Note = "C" | "C#" | "D" | "D#" | "E" | "F" | "F#" | "G" | "G#" | "A" | "A#" | "B"

export type PianoKey = {
    note: Note,
    octave: number,
    isBlackKey?: boolean,
    keyboardShortcut?: KeyboardKey
};

export type KeyboardMap = {
    [key in KeyboardKey]?: PianoKey
};

export type KeySettings = {
    displayNotes: Setting<boolean>,
    displayKeys: Setting<boolean>,
    enableMouse: Setting<boolean>,
}

export type Settings = KeySettings & {
    octaves: Setting<number>,
    startingOctave: Setting<number>,
}

type NumberSettings = {
    min?: number,
    max?: number
}

export type Setting<T> = {
    label: string,
    value: T,
} & NumberSettings