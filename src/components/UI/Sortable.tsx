import { Box } from '@mui/material'
import type { FC } from 'react'
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { Identifier } from 'typescript'

interface DragItem {
  index: number
  id: string
  type: string
}

export interface SortableProps {
  id: any
  index: number
  move: (dragIndex: number, hoverIndex: number) => void,
  children: JSX.Element
}

export const Sortable: FC<SortableProps> = ({ id, index, children, move }) => {
  const ref = useRef<HTMLDivElement>(null)

  const [, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "sortable",
    hover(item: DragItem) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      move(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [, drag] = useDrag({
    type: "sortable",
    item: () => {
      return { id, index }
    }
  })

  drag(drop(ref))
  return (
    <Box ref={ref} >
      {children}
    </Box>
  )
}