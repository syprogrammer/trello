import formatTodosForAI from "./formatTodosForAi";

const fetchSuggestion = async (board: Board) => {
    try {
        const todos = formatTodosForAI(board);
        console.log("formatted Todos to send", todos)
        const res = await fetch("/api/generateSummary", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ todos })
        })
        console.log("gpt response >>", res)
        const GPTdata = await res.json();
        const { content } = GPTdata;

        return content;
    } catch (error) {
        console.log("error from fetchsuggestion:",error)
        return 'hello syprogrammer have a productive day'
    }

}

export default fetchSuggestion