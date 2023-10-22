import { useState } from "react"
import { ChordsSettings, KeyboardSettings } from "../type"

const defaultKeyboardSettings: KeyboardSettings = {
    displayNotes: {
        label: "Display Notes",
        value: false
    },
    displayKeys: {
        label: "Display Keys",
        value: false
    },
    enableMouse: {
        label: "Enable Mouses",
        value: false
    },
    octaves: {
        label: "Number of Octaves",
        value: 2,
        min: 1,
        max: 5
    },
    startingOctave: {
        label: "Starting Octave",
        value: 3,
        min: 1,
        max: 4
    }
}

const defaultChordsSettings: ChordsSettings = {
    tempo: {
        label: "Tempo",
        value: 90,
        min: 60,
        max: 120
    },
    octaves: {
        label: "Number of Octaves",
        value: 2,
        min: 1,
        max: 5
    },
    startingOctave: {
        label: "Starting Octave         ",
        value: 3,
        min: 1,
        max: 4
    }
}

export const useChordsSettings = (initialSettings = defaultChordsSettings): {
    settings: ChordsSettings,
    update: (key: string, value: string) => void
} => {
    const [settings, setSettings] = useState(initialSettings)
    const updateSettings = (key: string, value: string) => {
        setSettings(prev => ({
            ...prev,
            [key]: {
                ...prev[key as keyof ChordsSettings],
                value: typeof prev[key as keyof ChordsSettings].value == "boolean" ? value === "true" : parseInt(value)
            }
        }))
    }
    return { settings: settings, update: updateSettings };
} 

export const useKeyboardSettings = (initialSettings = defaultKeyboardSettings): {
    settings: KeyboardSettings,
    update: (key: string, value: string) => void
} => {
    const [settings, setSettings] = useState(initialSettings)
    const updateSettings = (key: string, value: string) => {
        setSettings(prev => ({
            ...prev,
            [key]: {
                ...prev[key as keyof KeyboardSettings],
                value: typeof prev[key as keyof KeyboardSettings].value == "boolean" ? value === "true" : parseInt(value)
            }
        }))
    }
    return { settings: settings,  update: updateSettings };
} 