import { Card, IconButton, Collapse, Container } from '@mui/material';
import { useState } from 'react';
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

type CollapsibleBoxProps = {
    children: JSX.Element | JSX.Element[],
    icon?: JSX.Element | undefined
}

export const CollapsibleBox = (props: CollapsibleBoxProps): JSX.Element => {
    const { children, icon } = props;
    const [open, setOpen] = useState(true);

    return <>
        <Card >
            <IconButton
                onClick={() => setOpen(!open)}
                size="small"
            >
                {icon ? icon :
                    open ? <KeyboardArrowUpIcon />
                        : <KeyboardArrowDownIcon />
                }
            </IconButton>
            <Collapse
                in={open}
                timeout="auto"
                unmountOnExit
            >
                <Container>
                    {children}
                </Container>
            </Collapse>
        </Card>
    </>
}