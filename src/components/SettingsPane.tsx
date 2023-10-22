import { Setting, Settings } from "../type";
import {
    Box,
    Checkbox,
    Typography
} from '@mui/material';
import { CollapsibleBox } from "./UI/CollapsibleBox";

type SettingsPaneProps = {
    settings: Settings,
    onUpdateSettings: (label: string, value: string) => void
}

const validateNumberInput = (
    value: number,
    setting: Setting<number>
): boolean =>
    setting.max ? value <= setting.max : true
        &&
        setting.min ? value >= setting.min : true;

const SettingsPane = (props: SettingsPaneProps) => {
    const { settings, onUpdateSettings } = props;

    return (
        <CollapsibleBox
        >
            <Box sx={{
                display: 'flex',
                mx: 1,
                flexWrap: 'wrap',
                justifyContent: 'center'
            }}
            >
                {
                    Object.entries(settings).map(([key, setting]) =>
                        <Box
                            key={setting.label}
                            sx={{
                                display: "flex",
                                gap: .5,
                                mx: 1
                            }}
                        >
                            <Typography
                                align='center'
                            > {setting.label} </Typography>
                            {
                                typeof setting.value == "boolean" ?
                                    <Checkbox
                                        checked={setting.value}
                                        onChange={() => { onUpdateSettings(key, (!setting.value).toString()) }}
                                        sx={{ display: 'flex', height: 25 }}

                                    />
                                    :
                                    <input
                                        value={setting.value}
                                        type='number'
                                        min={setting.min}
                                        max={setting.max}
                                        onChange={(event) => { validateNumberInput(parseInt(event.target.value), setting) && onUpdateSettings(key, event.target.value) }}
                                    />
                            }
                        </Box>
                    )
                }
            </Box>
        </CollapsibleBox>
    )
}

// type SettingType = "number" | "string" | "boolean"

// type SettingProps = {}

// function Setting <T>(props: Setting<T>) {

//     switch (typeof props.value) {
//         case "boolean":
//             return <Checkbox
//                 checked={props.value}
//                 onChange={() => { onUpdateSettings(key, (!props.value).toString()) }}
//                 sx={{ display: 'flex', height: 25 }}

//             />
        

//     }

// }

export default SettingsPane;