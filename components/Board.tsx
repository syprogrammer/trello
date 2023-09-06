'use client'

import { useBoardStore } from '@/store/BoardStore'
import React, { useEffect } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

const Board = () => {
    const getBoard = useBoardStore((state)=>state.getBoard)

    useEffect(() => {
        getBoard()
    }, [])

    return (
        <h1>hello</h1>
        // <DragDropContext>
        //     <Droppable droppableId='board' type="column" direction='horizontal'>
        //         {

        //         }
        //     </Droppable>
        // </DragDropContext>
    )
}

export default Board