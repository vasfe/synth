import { NoteDuration, Chord } from "../type";
import { notes } from "../notes";

export const noteArrayFromChord = (chord: Chord): string[] => {
    const { root: { octave }, modification } = chord;
    const rootIndex = notes.indexOf(chord.root.note);
    switch (modification) {
        case "m":
            return [
                notes[rootIndex] + octave,
                getItemByWrappedIndex(notes, rootIndex + 3) + octave,
                getItemByWrappedIndex(notes, rootIndex + 7) + octave
            ]
        case "7":
            return [
                notes[rootIndex] + octave,
                getItemByWrappedIndex(notes, rootIndex + 4) + octave,
                getItemByWrappedIndex(notes, rootIndex + 7) + octave,
                getItemByWrappedIndex(notes, rootIndex + 10) + octave
            ]
        case "m7":
            return [
                notes[rootIndex] + octave,
                getItemByWrappedIndex(notes, rootIndex + 3) + octave,
                getItemByWrappedIndex(notes, rootIndex + 7) + octave,
                getItemByWrappedIndex(notes, rootIndex + 10) + octave
            ]
        default:
            return [
                notes[rootIndex] + octave,
                getItemByWrappedIndex(notes, rootIndex + 4) + octave,
                getItemByWrappedIndex(notes, rootIndex + 7) + octave
            ]
    }
}

export function getItemByWrappedIndex<T>(array: T[], index: number): T {
    return array[index - (Math.floor(index / array.length) * array.length)]
}

export const getNoteDurationInSeconds = (duration: NoteDuration, tempo: number) => duration * 4 / (tempo / 60)
