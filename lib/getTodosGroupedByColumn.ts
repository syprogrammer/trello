import { databases } from "@/appwrite"

export const getTodosGroupByColumn = async () => {
    const data = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_TODOS_COLLECTION_ID!
    );
    console.log(data)
    const todos = data.documents
    const columns = todos.reduce((acc, todo) => {
        if (!acc.get(todo.STATUS)) {
            console.log("todo status", todo.STATUS)
            acc.set(todo.STATUS, {
                id: todo.STATUS,
                todos: []
            })
        }
        console.log("acc get", todo.STATUS, acc.get(todo.STATUS))
        acc.get(todo.STATUS)!.todos.push({
            $id: todo.$id,
            $createdAt: todo.$createdAt,
            title: todo.title,
            status: todo.STATUS,
            ...[todo.image && { image: JSON.parse(todo.image) }]
        })
      
        // Update the 'todos' array in the Map entry
        
        return acc;
    }, new Map<TypedColumn, Column>)

    //if columns does not have inprogress,todo and done, add them with
    // empty todos 

    const columnTypes: TypedColumn[] = ["todo", "inprogress", "done"];
    // for (const columnType of columnTypes) {
    //     console.log("columnType",columnType)
    //     columns.set(columnType, {
    //         id: columnType,
    //         todos: [],
    //     })
    // }

    //sort columns by columnTypes

    const sortedColumns = new Map(
        Array.from(columns.entries()).sort((a, b) => (
            columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
        ))
    )

    const board: Board = {
        columns: sortedColumns,
    }

    return board;

}