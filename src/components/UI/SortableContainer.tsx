import { Box } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Sortable } from './Sortable';

type SortableContainerProps<T> = {
    children: JSX.Element[],
    source: T[],
    onMove:  (dragIndex: number, hoverIndex: number) => void,
}

export function SortableContainer<T>(props: SortableContainerProps<T>): JSX.Element {
    const { children, onMove } = props;

    return (
        <DndProvider backend={HTML5Backend}>
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: .5
            }}>
                {children.map((child, i) =>
                    <Sortable
                        id={i}
                        index={i}
                        move={onMove}
                    >
                        {child}
                    </Sortable>)}
            </Box>
        </DndProvider>
    )
}
