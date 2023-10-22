import React, { useCallback, useEffect, useMemo } from 'react'
import { Box } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
// import { PropsOf } from '@emotion/react';
import { Sortable } from './Sortable';

// type SortableContextType = {
//     sortable: any[],
//     moveSortable: (dragIndex: number, hoverIndex: number) => void
// }

// export const SortableContext = React.createContext<SortableContextType>({
//     sortable: [],
//     moveSortable: () => "Not implemented. Did you forget the provider?"
// });

type SortableContainerProps<T, ItemT> = {
    children: JSX.Element[],
    source: T[],
    // item: (props?: any) => ItemT;
    onMove:  (dragIndex: number, hoverIndex: number) => void,
}

export function SortableContainer<T, ItemT = any>(props: SortableContainerProps<T, ItemT>): JSX.Element {
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

// export const useSortable = () => React.useContext(SortableContext);