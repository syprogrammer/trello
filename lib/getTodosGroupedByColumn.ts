import { databases } from "@/appwrite"

export const getTodosGroupByColumn = async () => {
    const data = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_TODOS_COLLECTION_ID!
    );
    console.log(data)
    const todos = data.documents
    const columns = todos.reduce((acc, todo) => {
        if (!acc.get(todo.status)) {
            acc.set(todo.status, {
                id: todo.status,
                todos: []
            })
        }

        acc.get(todo.status)!.todos.push({
            $id: todo.$id,
            $createdAt: todo.$createdAt,
            title: todo.title,
            status: todo.status,
            ...[todo.image && { image: JSON.parse(todo.image) }]
        })

        return acc;
    }, new Map<TypedColumn, Column>)

    //if columns does not have inprogress,todo and done, add them with
    // empty todos 

    const columnTypes: TypedColumn[] = ["todo", "inprogress", "done"];
    for (const columnType of columnTypes) {
        columns.set(columnType, {
            id: columnType,
            todos: [],
        })
    }

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