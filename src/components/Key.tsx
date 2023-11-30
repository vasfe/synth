import { KeyboardSettings } from "../type";
import { PianoKey } from "../type";
import { notes } from '../notes';
import { Box } from "@mui/material";

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

    const keyStyle = {
        width: keyWidth,
        borderRadius: '5px',
        border: 'rgb(92, 92, 92) 2px solid',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'end',
        boxSizing: 'border-box',
        transition: 'transform 0.1s',
        transformOrigin: 'top center',
        height: '100%',
        ...(
            key.isBlackKey ? {
                left: keyWidth / 2 + keyWidth * Math.ceil((notes.indexOf(key.note) - 1) / 2),
                position: 'absolute',
                transform: 'scale(60%, 65%)',
                backgroundColor: 'black',
                zIndex: 10,
                ...(isPressed && {
                    transform: 'scale(60%, 65%) rotateX(10deg)',
                    boxShadow: 'inset 0 0 20px #ffffff',
                })
            } :
                {
                    ...(isPressed && {
                        transform: 'rotateX(10deg)',
                        boxShadow: 'inset 0 0 20px #606060'
                    })
                }

        )
    }

    return (
        <Box
            className={` ${key.isBlackKey ? 'black' : 'white'} ${isPressed ? 'pressed' : ''}`}
            sx={keyStyle}
            onMouseEnter={settings.enableMouse.value ? () => onPress(key) : () => { }}
            onMouseLeave={settings.enableMouse.value ? () => onRelease(key) : () => { }}
            key={key.note + key.octave}
        >
            {displayKeys.value &&
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        color: key.isBlackKey ? 'white' : 'black'
                    }}
                >
                    {key.keyboardShortcut}
                </Box>
            }
            {displayNotes.value &&
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        color: key.isBlackKey ? 'white' : 'black'
                    }}
                >
                    {key.note + key.octave}
                </Box>
            }
        </Box>
    )
}

export default Key;