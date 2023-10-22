import { notes } from "../notes";
import { Chord } from "../type"
import { wrapIndex } from "../utils";

export const makeNoteArrayFromChord = (chord: Chord): string[] => {
    const rootIndex = notes.indexOf(chord.root.note);

    switch (chord.modification) {
        case "m":
            return [
                notes[rootIndex] + chord.root.octave,
                notes[wrapIndex(notes, rootIndex + 3)] + chord.root.octave,
                notes[wrapIndex(notes, rootIndex + 7)] + chord.root.octave
            ]
        case "7":
            return [
                notes[rootIndex] + chord.root.octave,
                notes[wrapIndex(notes, rootIndex + 4)] + chord.root.octave,
                notes[wrapIndex(notes, rootIndex + 7)] + chord.root.octave,
                notes[wrapIndex(notes, rootIndex + 10)] + chord.root.octave
            ]
        case "m7":
            return [
                notes[rootIndex] + chord.root.octave,
                notes[wrapIndex(notes, rootIndex + 3)] + chord.root.octave,
                notes[wrapIndex(notes, rootIndex + 7)] + chord.root.octave,
                notes[wrapIndex(notes, rootIndex + 10)] + chord.root.octave
            ]
        default:
            return [
                notes[rootIndex] + chord.root.octave,
                notes[wrapIndex(notes, rootIndex + 4)] + chord.root.octave,
                notes[wrapIndex(notes, rootIndex + 7)] + chord.root.octave
            ]
    }
}



// export const useSynth = (instrument = defaultInstrument): {
//     synth: PolySynth,
//     attack: (key: string) => void,
//     release: (key: string) => void
// } => {
//     // const [instrument, setInstrument] = useState(initialInstrument)

//     const synth =

//         useMemo(() => {

//             let tone;

//             switch (instrument) {
//                 // case "FMSynth":
//                 //     tone = Tone.FMSynth
//                 //     break;
//                 // case "AMSynth":
//                 //     tone = Tone.AMSynth
//                 //     break;
//                 // case "NoiseSynth":
//                 //     tone = Tone.NoiseSynth
//                 //     break;
//                 default:
//                     tone = Tone.Synth;
//             }

//             // if (tone)
//             return new Tone.PolySynth(tone).toDestination()
//         }
//             , [instrument])
//         ;

//     const attack = (key: string) => synth.triggerAttack(key)
//     const release = (key: string) => synth.triggerRelease([key], Tone.now())

//     return { synth, attack, release };
// }
