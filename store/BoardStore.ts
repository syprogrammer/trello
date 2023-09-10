import { getTodosGroupByColumn } from '@/lib/getTodosGroupedByColumn';
import { create } from 'zustand'
import { ID, databases } from "@/appwrite"
import uploadImage from '@/lib/uploadImage';

interface BoardState {
    board: Board;
    getBoard: () => void;
    setBoardState: (board: Board) => void
    updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
    newTaskInput: string;
    newTaskType: TypedColumn;
    searchString: string;
    image: File | null;

    addTask: (todo: string, columnId: TypedColumn, image?: File | null) => void
    deleteTask: (taskIndex: number, todo: Todo, id: TypedColumn) => void
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
    image: null,

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
    },
    deleteTask: async (taskIndex: number, todo: Todo, id: TypedColumn) => {
        await databases.deleteDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_TODOS_COLLECTION_ID!,
            todo.$id,
        )
    },
    addTask: async (todo: string, columnId: TypedColumn, image?: File | null) => {

        let file: Image | undefined;

        if (image) {
            const fileUploaded = await uploadImage(image);
            if (fileUploaded) {
                file = {
                    bucketId: fileUploaded.bucketId,
                    fileId: fileUploaded.$id,
                }
            }
        }

        const { $id } = await databases.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_TODOS_COLLECTION_ID!,
            ID.unique(),
            {
                title: todo,
                STATUS: columnId,
                ...(file && { image: JSON.stringify(file) })
            }
        )

        set({ newTaskInput: "" })

        set((state) => {
            const newColumns = new Map(state.board.columns)
            const newTodo: Todo = {
                $id,
                $createdAt: new Date().toISOString(),
                title: todo,
                status: columnId,
                ...(file && { image: file }),
            };

            const column = newColumns.get(columnId);
            if (!column) {
                newColumns.set(columnId, {
                    id: columnId,
                    todos: [newTodo]
                })
            } else {
                newColumns.get(columnId)?.todos.push(newTodo);
            }
            return {
                board: {
                    columns: newColumns,
                }
            }

        })

    }

}))