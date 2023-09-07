import React from 'react'
import {
    DraggableProvidedDragHandleProps,
    DraggableProvidedDraggableProps,

} from 'react-beautiful-dnd'

type Props = {
    todo: Todo;
    index: number;
    id: TypedColumn;
    innerRef: (element: HTMLElement | null) => void;
    draggableProps: DraggableProvidedDragHandleProps;
    dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;

}

const TodoCard = ({

}: Props) => {
    return (
        <div>TodoCard</div>
    )
}

export default TodoCard