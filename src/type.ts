import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export type KeyboardKey =
    '`' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0' | '-' | '=' |
    'Q' | 'W' | 'E' | 'R' | 'T' | 'Y' | 'U' | 'I' | 'O' | 'P' | '[' | ']' | '#' |
    'A' | 'S' | 'D' | 'F' | 'G' | 'H' | 'J' | 'K' | 'L' | ';' | "'" |
    'Z' | 'X' | 'C' | 'V' | 'B' | 'N' | 'M' | ',' | '.' | '/'

export type BasicNotes = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B'

export const noteDuration = [.25, .5, .75, 1] as const;

export type NoteDuration = typeof noteDuration[number];

// export type NoteDuration = .25 | .5 | .75 | 1
// 
export type Note = {
    note: BasicNotes,
    octave: number
}

export const chordModifications = ['','m', '7', 'm7'] as const;

export type ChordModification = typeof chordModifications[number];


export type PianoKey = Note & {
    isBlackKey?: boolean,
    keyboardShortcut?: KeyboardKey
};

export type KeyboardMap = {
    [key in KeyboardKey]?: PianoKey
};

export type KeyboardSettings = {
    displayNotes: Setting<boolean>,
    displayKeys: Setting<boolean>,
    enableMouse: Setting<boolean>,
    octaves: Setting<number>,
    startingOctave: Setting<number>,
}

export type ChordsSettings = {
    tempo: Setting<number>,
    octaves: Setting<number>,
    startingOctave: Setting<number>,
}

export type Settings = KeyboardSettings | ChordsSettings;

type NumberSettings = {
    min?: number,
    max?: number
}

export type Setting<T> = {
    label: string,
    value: T,
} & NumberSettings

export type Instrument = 'Tone' | 'FMSynth' | 'AMSynth' | 'NoiseSynth';

export type Icon = OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
}

export type Chord = {
    root: Note,
    modification: ChordModification,
    duration: NoteDuration
}