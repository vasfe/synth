import { useMemo } from "react"
import { Chord, Instrument, NoteDuration } from "../type"
import * as Tone from 'tone'
import { PolySynth, Time } from "tone"
import { makeNoteArrayFromChord } from "./chords";
import { getNoteDurationInSeconds } from "../utils";

const noteDelay = 0;

const defaultInstrument: Instrument = "FMSynth";
export const useSynth = (instrument= defaultInstrument): {
    attack: (keys: string[]) => void,
    release: (keys: string[]) => void,
    playChords: (chord: Chord[], tempo: number) => void
} => {
    const now = Tone.now()

    const synth = useMemo(() => {
        let tone;
        switch (instrument) {
            // case "FMSynth":
            //     tone = Tone.FMSynth
            //     break;
            // case "AMSynth":
            //     tone = Tone.AMSynth
            //     break;
            // case "NoiseSynth":
            //     tone = Tone.NoiseSynth
            //     break;
            default:
                tone = Tone.FMSynth;
        }
        return new PolySynth(tone).toDestination()
    }, [instrument]);

    const attack = (
        keys: string[],
        duration?: NoteDuration
    ) => {
        if (duration) {
            synth.triggerAttackRelease(keys, duration)
        }
        else {
            synth.triggerAttack(keys, now)
        }
    }

    const playChords = (chords: Chord[], tempo: number) => {
        let delay = 0;
        chords.forEach(chord => {
            const chordDurationInSeconds = getNoteDurationInSeconds(chord.duration, tempo)
            synth.triggerAttackRelease(
                makeNoteArrayFromChord(chord),
                chordDurationInSeconds + noteDelay,
                Tone.now() + delay
            )
            delay += chordDurationInSeconds;
        });
    }

    const release = (keys: string[]) => synth.triggerRelease(keys, Tone.now())

    return { attack, release, playChords };
}

