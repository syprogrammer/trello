import { getTodosGroupByColumn } from '@/lib/getTodosGroupedByColumn';
import { create } from 'zustand'
import { databases } from "@/appwrite"

interface BoardState {
    board: Board;
    getBoard: () => void;
    setBoardState: (board: Board) => void
    updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
    searchString: string;
    setSearchString: (searchString: string) => void;
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
    searchString: "",
    setSearchString: (searchString) => set({ searchString }),
    setBoardState: (board) => set({ board }),
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