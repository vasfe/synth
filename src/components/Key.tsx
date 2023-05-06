import { KeySettings } from "../type";
import { PianoKey } from "../type";
import { notes } from '../notes';

import './keyboard.css';

type KeyProps = {
    note: PianoKey,
    settings: KeySettings,
    isPressed: boolean,
    onPress: (note: PianoKey) => void,
    onRelease: (note: PianoKey) => void,
}

const keyWidth = 40;

const Key = (props: KeyProps): JSX.Element => {
    const { note, settings, isPressed, onPress, onRelease } = props;
    const { displayKeys, displayNotes } = settings;
    let keyStyle: React.CSSProperties = { width: keyWidth }

    if (note.isBlackKey) {
        const left = keyWidth / 2 + keyWidth * Math.ceil((notes.indexOf(note.note) - 1) / 2)
        keyStyle = {
            ...keyStyle,
            left
        }
    }

    return (
        <div
            className={`key ${note.isBlackKey ? 'black' : 'white'} ${isPressed ? 'pressed' : ''}`}
            style={keyStyle}
            onMouseEnter={settings.enableMouse.value ? () => onPress(note) : () => { }}
            onMouseLeave={settings.enableMouse.value ? () => onRelease(note) : () => { }}
        >
            {displayKeys.value &&
                <div className={`key-label ${note.isBlackKey ? 'black' : 'white'}`}>
                    {note.keyboardShortcut}
                </div>
            }
            {displayNotes.value &&
                <div className={`key-label ${note.isBlackKey ? 'black' : 'white'}`}>
                    {note.note + note.octave}
                </div>
            }
        </div>
    )
}

export default Key;