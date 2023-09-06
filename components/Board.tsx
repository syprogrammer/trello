'use client'

import React, { useEffect } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

const Board = () => {
    useEffect(() => {
        //getBoard()
    }, [])
    
    return (
        <DragDropContext>
            <Droppable droppableId='board' type="column" direction='horizontal'>
                {

                }
            </Droppable>
        </DragDropContext>
    )
}

export default Board