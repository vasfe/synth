import { KeyboardSettings } from "../type";
import { PianoKey } from "../type";
import { notes } from '../notes';
import { Box } from "@mui/material";
import './keyboard.css';

type KeyProps = {
    pianoKey: PianoKey,
    settings: KeyboardSettings,
    isPressed: boolean,
    onPress: (note: PianoKey) => void,
    onRelease: (note: PianoKey) => void,
}

const keyWidth = 40;

const Key = (props: KeyProps): JSX.Element => {
    const { pianoKey: key, settings, isPressed, onPress, onRelease } = props;
    const { displayKeys, displayNotes } = settings;
    let keyStyle: React.CSSProperties = { width: keyWidth }

    if (key.isBlackKey) {
        const left = keyWidth / 2 + keyWidth * Math.ceil((notes.indexOf(key.note) - 1) / 2)
        keyStyle = {
            ...keyStyle,
            left
        }
    }

    return (
        <Box
            className={`key ${key.isBlackKey ? 'black' : 'white'} ${isPressed ? 'pressed' : ''}`}
            style={keyStyle}
            onMouseEnter={settings.enableMouse.value ? () => onPress(key) : () => { }}
            onMouseLeave={settings.enableMouse.value ? () => onRelease(key) : () => { }}
            key={key.note + key.octave}
        >
            {displayKeys.value &&
                <Box className={`key-label ${key.isBlackKey ? 'black' : 'white'}`}>
                    {key.keyboardShortcut}
                </Box>
            }
            {displayNotes.value &&
                <Box className={`key-label ${key.isBlackKey ? 'black' : 'white'}`}>
                    {key.note + key.octave}
                </Box>
            }
        </Box>
    )
}

export default Key;