import { useCallback, useMemo } from "react"
import { Chord, Instrument, NoteDuration } from "../type"
import * as Tone from 'tone'
import { PolySynth } from "tone"
import { getNoteDurationInSeconds, noteArrayFromChord } from "../utils";

const noteDelay = 0;
const now = Tone.now()

const defaultInstrument: Instrument = "FMSynth";
export const useSynth = (instrument= defaultInstrument): {
    attack: (keys: string[]) => void,
    release: (keys: string[]) => void,
    playChords: (chord: Chord[], tempo: number) => void
} => {

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

    const attack = useCallback((
        keys: string[],
        duration?: NoteDuration
    ) => {
        if (duration) {
            synth.triggerAttackRelease(keys, duration)
        }
        else {
            synth.triggerAttack(keys, now)
        }
    },[synth])

    const playChords = useCallback((chords: Chord[], tempo: number) => {
        let delay = 0;
        chords.forEach(chord => {
            const chordDurationInSeconds = getNoteDurationInSeconds(chord.duration, tempo)
            synth.triggerAttackRelease(
                noteArrayFromChord(chord),
                chordDurationInSeconds + noteDelay,
                Tone.now() + delay
            )
            delay += chordDurationInSeconds;
        });
    },[synth])

    const release = useCallback((keys: string[]) => synth.triggerRelease(keys, Tone.now()),[synth])

    return { attack, release, playChords };
}

