import React from 'react'
import { Chord as ChordType } from '../type';
import { Box } from '@mui/material';
import { ListMenu } from './UI';
import { Delete, Edit } from '@mui/icons-material';
import { flexColumn } from './styles'

export type ChordProps = {
    remove: () => void,
    edit: () => void,
    chord: ChordType,
    id: number,
    active?: boolean
}

export const Chord = (props: ChordProps): JSX.Element => {
    const { remove, edit, chord, id, active = false } = props;

    return (
        <Box
            sx={{
                ...flexColumn,
                gap: 0,
                height: 60,
                width: 60,
                boxShadow: '0 0 5px rgba(0, 0, 0, 0.517)',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                background: active ? 'yellow' : 'white',
            }}
            key={id}
        >
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}>
                <ListMenu
                    options={[
                        {
                            onClick: remove,
                            label: <Delete sx={{ fontSize: 18, }} />
                        },
                        {
                            onClick: edit,
                            label: <Edit sx={{ fontSize: 18 }} />
                        }
                    ]}
                />
            </Box>
            <Box>
                {chord.root.note}{chord.modification}
            </Box>
            <Box>
                {chord.duration}
            </Box>
        </Box>

    )
}
