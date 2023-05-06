import { useState } from "react"
import { Settings } from "../type"

const defaultSettings: Settings = {
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
        label: "Starting Octaves",
        value: 3,
        min: 1,
        max: 4
    }
}

export const useSettings = (initialSettings = defaultSettings): {
    settings: Settings,
    update: (key: string, value: string) => void
} => {

    const [settings, setSettings] = useState(initialSettings)

    const updateSettings = (key: string, value: string) => {
        setSettings(prev => ({
            ...prev,
            [key]: {
                ...prev[key as keyof Settings],
                value: typeof prev[key as keyof Settings].value == "boolean" ? value === "true" : parseInt(value)
            }
        }))
    }
    return { settings, update: updateSettings };
} 