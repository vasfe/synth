import { useState } from "react";
import { Setting, Settings } from "../type";
import {
    Container,
    Box,
    IconButton,
    Checkbox,
    Typography,
    Collapse,
    Card
} from '@mui/material';

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SettingsIcon from '@mui/icons-material/Settings'; type SettingsPaneProps = {
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
    const [open, setOpen] = useState(false);

    return (
        <Card 
        sx={{
            border: "1px solid rgba(211,211,211,0.6)"
        }}>
            <IconButton
                onClick={() => setOpen(!open)}
                aria-label="expand"
                size="small"
            >
                {open ? <KeyboardArrowUpIcon />
                    : <SettingsIcon />}
            </IconButton>
                <Collapse
                    in={open}
                    timeout="auto"
                    unmountOnExit
                >
                    <Container sx={{
                        display: "flex",
                        gap: 2,
                        flexWrap: 'wrap'
                    }}>
                        {
                            Object.entries(settings).map(([key, setting]) =>
                                <Box
                                    key={setting.label}
                                    sx={{ display: "flex" }}
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
                    </Container>
                </Collapse>
        </Card>
    )
}

export default SettingsPane;