import { getTodosGroupByColumn } from '@/lib/getTodosGroupedByColumn';
import { create } from 'zustand'
import { databases } from "@/appwrite"

interface BoardState {
    board: Board;
    getBoard: () => void;
    setBoardState: (board: Board) => void
    updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
    newTaskInput: string;
    newTaskType: TypedColumn;
    searchString: string;
    image: File | null;

    setSearchString: (searchString: string) => void;
    setNewTaskInput: (input: string) => void;
    setNewTaskType: (columnId: TypedColumn) => void;
    setImage: (image: File | null) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
    board: {
        columns: new Map<TypedColumn, Column>()
    },
    getBoard: async () => {
        const board = await getTodosGroupByColumn();
        console.log("getboardstore : ", board)
        set({ board })
    },
    newTaskType: "todo",
    newTaskInput: "",
    searchString: "",
    image:null,

    setSearchString: (searchString) => set({ searchString }),
    setBoardState: (board) => set({ board }),

    setNewTaskInput: (input: string) => set({ newTaskInput: input }),
    setNewTaskType: (columnId: TypedColumn) => set({ newTaskType: columnId }),
    setImage: (image: File | null) => set({ image }),
    updateTodoInDB: async (todo, columnId) => {
        await databases.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_TODOS_COLLECTION_ID!,
            todo.$id,
            {
                title: todo.title,
                STATUS: columnId
            }
        )
    }
}))